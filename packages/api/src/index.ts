import dotENV from 'dotenv';
import App from './App';

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

const Middlewares = [
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
