import Express from 'express';
import jwt from 'jsonwebtoken';

import { RequestWithUser } from '../interfaces/express.interface';

console.log('[*] Loaded Auth Middleware');

export default (
    req: RequestWithUser,
    res: Express.Response,
    next: Express.NextFunction,
): void => {
    try {
        // Gets the Auth Token from the Headers or Cookies "x-auth-token"
        const token =
            req.headers['x-auth-token'] || req.cookies['x-auth-token'];

        //Checks if Token is Present and then decodes it with secret
        if (token) {
            jwt.verify(
                token,
                process.env.SECRET as jwt.Secret,
                {},
                (err: jwt.VerifyErrors, payload: any) => {
                    // Checks for JWT Errors, if not processes payload
                    if (err) {
                        console.error(err);
                        next();
                    } else {
                        // Checks if the Payload is present and then searchs DB for Session Entry
                        if (payload) {
                        } else {
                            next();
                        }
                    }
                },
            );
        } else {
            next();
        }
    } catch (e) {
        next();
    }
};
