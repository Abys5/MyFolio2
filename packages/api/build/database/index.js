"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var configurations = require('./knexfile');
var environment = process.env.NODE_ENV || 'development';
var config = configurations[environment];
var db = knex_1.default(config);
db.raw('select 1+1 as result')
    .catch(function (err) {
    console.log(err);
    process.exit(1);
})
    .then(function () {
    console.log('Connected to ' + process.env.MYSQL_DB + ' - ' + process.env.MYSQL_USER + '@' + process.env.MYSQL_HOST);
});
exports.default = db;
//# sourceMappingURL=index.js.map