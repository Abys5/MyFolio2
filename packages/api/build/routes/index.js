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
var v1_1 = __importDefault(require("./v1/v1"));
exports.default = (function () {
    var API = Express.Router();
    API.use('/v1', v1_1.default);
    API.get('/status', function (req, res) {
        res.json({
            status: {
                route: '/api/status',
                msg: 'OK',
            },
        });
    });
    return API;
})();
//# sourceMappingURL=index.js.map