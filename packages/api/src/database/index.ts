import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configurations = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';
const config = configurations[environment];
const db: knex = knex(config);

db.raw('select 1+1 as result')
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .then(() => {
        console.log(
            'Connected to ' +
                process.env.MYSQL_DB +
                ' - ' +
                process.env.MYSQL_USER +
                '@' +
                process.env.MYSQL_HOST,
        );
    });

export default db;
