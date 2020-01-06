declare namespace NodeJS {
    export interface ProcessEnv {
        MYSQL_HOST: string;
        MYSQL_PORT: string;
        MYSQL_USER: string;
        MYSQL_PASS: string;
        MYSQL_DB: string;

        LISTEN_PORT: string;

        SECRET: string;

        NODE_ENV: string;
    }
}
