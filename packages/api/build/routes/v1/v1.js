"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express = __importStar(require("express"));
var user_1 = __importDefault(require("./user"));
exports.default = (function () {
    var V1 = Express.Router();
    V1.use('/user', user_1.default());
    V1.get('/status', function (req, res) {
        res.json({
            status: {
                route: '/api/v1/status',
                msg: 'OK',
            },
        });
    });
    return V1;
})();
//# sourceMappingURL=v1.js.map