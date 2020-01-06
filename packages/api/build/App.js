"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var Server = /** @class */ (function () {
    function Server(middlewares) {
        this.expressApp = express_1.default();
        this.port = Number(process.env.PORT) || 3000;
        this.initMiddleware(middlewares);
        this.initRoutes();
    }
    Server.prototype.initMiddleware = function (middlewares) {
        var _this = this;
        middlewares.forEach(function (middleware) {
            _this.expressApp.use(middleware);
        });
    };
    Server.prototype.initRoutes = function () {
        this.expressApp.use('/api', routes_1.default);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.expressApp.listen(this.port, function () {
            console.log('[*] MyFolio API has Started on Port: ' + _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=App.js.map