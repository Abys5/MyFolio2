"use strict";
require('ts-node/register');
require('dotenv').config();
var configs = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB + '_dev',
        },
        migrations: {
            directory: __dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/seeds',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
        },
        migrations: {
            directory: __dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/seeds/production',
        },
    },
};
module.exports = configs;
//# sourceMappingURL=knexfile.js.map