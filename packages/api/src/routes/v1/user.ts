import Express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../database/user';
import Session from '../../database/session';

import loginFormValidator from '../../validator/loginFormValidator';
import registerFormValidator from '../../validator/registerFormValidator';

import { RequestWithUser } from 'src/interfaces/express.interface';

export default (): Express.Router => {
    const UserRouter = Express.Router();

    UserRouter.post('/', (req: RequestWithUser, res: Express.Response) => {
        console.log(req.user);
        if (req.user) {
            res.json(req.user);
        } else {
            res.send('BAD');
        }
    });

    UserRouter.post('/login', (req, res) => {
        const { errors, isValid } = loginFormValidator(req.body);

        if (!isValid) {
            return res.json({ errors });
        }

        User.getUserByEmail(req.body.email, (userEntry) => {
            if (userEntry != null) {
                bcrypt.compare(
                    req.body.password,
                    userEntry.password,
                    (err, isSame) => {
                        if (err) {
                            throw err;
                        }

                        if (isSame) {
                            Session.createSession(userEntry.id, (token) => {
                                jwt.sign(
                                    { token },
                                    process.env.SECRET as any,
                                    {},
                                    (err: Error, jwtToken: string) => {
                                        if (err) {
                                            throw err;
                                        }
                                        return res.json({ token: jwtToken });
                                    },
                                );
                            });
                        } else {
                            return res.json({
                                errors: { form: 'Credentials are Incorrect' },
                            });
                        }
                    },
                );
            } else {
                return res.json({
                    errors: { form: 'Credentials are Incorrect' },
                });
            }
        });
    });

    UserRouter.post('/register', (req, res) => {
        const { errors, isValid } = registerFormValidator(req.body);
        //console.log(Object.keys(errors).length);
        if (!isValid) {
            return res.json({ errors });
        }

        User.createUser(
            req.body.first_name,
            req.body.last_name,
            req.body.username,
            req.body.email,
            req.body.password,
            (result) => {
                if (result) {
                    res.json({ msg: 'User Created!' });
                } else {
                    res.json({
                        errors: { form: 'Error Occured when creating user' },
                    });
                }
            },
        );
    });

    return UserRouter;
};
