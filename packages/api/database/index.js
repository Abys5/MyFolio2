var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var db = require('knex')(config);

db.raw('select 1+1 as result')
    .catch(err => {
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
                process.env.MYSQL_HOST
        );
    });

module.exports = db;
