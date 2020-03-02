import Express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import loginFormValidator from '../../validator/loginFormValidator';
import registerFormValidator from '../../validator/registerFormValidator';

import { RequestWithUser } from '../../interfaces/express.interface';

export default ((): Express.Router => {
    const UserRouter = Express.Router();

    UserRouter.post('/', (req: RequestWithUser, res: Express.Response) => {
        //console.log(req.user);
        if (req.user) {
            const user = req.user;
            delete user.password;
            delete user.id;
            delete user.created_at;
            delete user.updated_at;
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
        //TODO: ADD USER LOGIN
    });

    UserRouter.post('/register', (req, res) => {
        const { errors, isValid } = registerFormValidator(req.body);
        //console.log(Object.keys(errors).length);
        if (!isValid) {
            return res.json({ errors });
        }
        //TODO: ADD USER CREATION
    });

    UserRouter.all('/status', (req, res) => {
        res.json({
            status: {
                route: '/api/v1/user/status',
                msg: 'OK',
            },
        });
    });

    return UserRouter;
})();
