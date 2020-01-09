import dotENV from 'dotenv';
import App from './App';

/*
 *
 * Interfaces
 *
 */
import Middleware from './interfaces/Middleware.interface';

/*
 *
 *   Middleware
 *
 */
import CORS from 'cors';
import Morgan from 'morgan';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';

import AuthMiddleware from './middleware/authenication.middleware';

const Middlewares: Middleware | any = [
    CORS(),
    Morgan('dev'),
    BodyParser.urlencoded({ extended: true }),
    BodyParser.json(),
    CookieParser(),
    AuthMiddleware,
];

try {
    dotENV.config();
    const Server = new App(Middlewares);
    Server.listen();
} catch (error) {
    console.error(error);
}
