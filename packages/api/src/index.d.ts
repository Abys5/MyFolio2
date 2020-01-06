import User from './interfaces/User';
import jwt from 'jsonwebtoken';

declare namespace NodeJS {
    export interface ProcessEnv {
        MYSQL_HOST: string;
        MYSQL_PORT: number;
        MYSQL_USER: string;
        MYSQL_PASS: string;
        MYSQL_DB: string;

        LISTEN_PORT: number;

        SECRET: string | jwt.Secret;

        NODE_ENV: string;
    }
}
