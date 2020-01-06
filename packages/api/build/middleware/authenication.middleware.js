"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var session_1 = __importDefault(require("../database/session"));
var user_1 = __importDefault(require("../database/user"));
console.log('[*] Loaded Auth Middleware');
exports.default = (function (req, res, next) {
    try {
        var token = req.headers['x-auth-token'] || req.cookies['x-auth-token'];
        if (token) {
            //const payload: any = jwt.verify(token, process.env.SECRET, {});
            jsonwebtoken_1.default.verify(token, process.env.SECRET, {}, function (err, payload) {
                if (payload) {
                    session_1.default.getSessionByToken(payload.token, function (sessionEntry) {
                        if (sessionEntry != null) {
                            user_1.default.getUserByID(sessionEntry.user_id, function (userEntry) {
                                if (userEntry != null) {
                                    req.user = userEntry;
                                    next();
                                }
                                else {
                                    //req.user = undefined;
                                    next();
                                }
                            });
                        }
                        else {
                            //req.user = undefined;
                            next();
                        }
                    });
                }
                else {
                    //req.user = undefined;
                    next();
                }
            });
        }
    }
    catch (e) {
        //req.user = undefined;
        next();
    }
});
//# sourceMappingURL=authenication.middleware.js.map