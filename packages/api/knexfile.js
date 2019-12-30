// Update with your config settings.
require('dotenv').config();
module.exports = {
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
            directory: __dirname + '/database/migrations',
        },
        seeds: {
            directory: __dirname + '/database/seeds',
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
            directory: __dirname + '/database/migrations',
        },
        seeds: {
            directory: __dirname + '/database/seeds/production',
        },
    },
};