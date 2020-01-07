import Express from 'express';
import jwt from 'jsonwebtoken';

import Session from '../database/session';
import User from '../database/user';

import { RequestWithUser } from 'src/interfaces/express.interface';

console.log('[*] Loaded Auth Middleware');

export default (
    req: RequestWithUser,
    res: Express.Response,
    next: Express.NextFunction,
): void => {
    try {
        const token =
            req.headers['x-auth-token'] || req.cookies['x-auth-token'];

        if (token) {
            //const payload: any = jwt.verify(token, process.env.SECRET, {});
            jwt.verify(
                token,
                process.env.SECRET as jwt.Secret,
                {},
                (err: jwt.VerifyErrors, payload: any) => {
                    if (payload) {
                        Session.getSessionByToken(
                            payload.token,
                            (sessionEntry) => {
                                if (sessionEntry != null) {
                                    User.getUserByID(
                                        sessionEntry.user_id,
                                        (userEntry) => {
                                            if (userEntry != null) {
                                                req.user = userEntry;
                                                next();
                                            } else {
                                                //req.user = undefined;
                                                next();
                                            }
                                        },
                                    );
                                } else {
                                    //req.user = undefined;
                                    next();
                                }
                            },
                        );
                    } else {
                        //req.user = undefined;
                        next();
                    }
                },
            );
        } else {
            next();
        }
    } catch (e) {
        //req.user = undefined;
        next();
    }
};
