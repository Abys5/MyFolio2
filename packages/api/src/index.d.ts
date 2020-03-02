import jwt from 'jsonwebtoken';

declare namespace NodeJS {
    export interface ProcessEnv {
        LISTEN_PORT: number;

        SECRET: string | jwt.Secret;

        NODE_ENV: string;
    }
}
