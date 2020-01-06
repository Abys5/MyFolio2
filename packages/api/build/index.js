"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var App_1 = __importDefault(require("./App"));
/*
 *
 *   Middleware
 *
 */
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var authenication_middleware_1 = __importDefault(require("./middleware/authenication.middleware"));
var Middlewares = [
    cors_1.default(),
    morgan_1.default('dev'),
    body_parser_1.default.urlencoded({ extended: true }),
    body_parser_1.default.json(),
    cookie_parser_1.default(),
    authenication_middleware_1.default,
];
try {
    dotenv_1.default.config();
    var Server = new App_1.default(Middlewares);
    Server.listen();
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.js.map