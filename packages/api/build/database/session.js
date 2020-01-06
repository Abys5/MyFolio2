"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var uid_generator_1 = __importDefault(require("uid-generator"));
var uidgen = new uid_generator_1.default(512, uid_generator_1.default.BASE58);
function getSessionByToken(token, cb) {
    database_1.default('sessions')
        .select('*')
        .where({ token: token })
        .then(function (ret) {
        if (ret[0]) {
            return cb(ret[0]);
        }
        else {
            return cb(null);
        }
    });
}
function createSession(userID, cb) {
    var token = uidgen.generateSync();
    database_1.default('users')
        .select()
        .where({ id: userID })
        .then(function (ret) {
        var user = ret[0];
        if (user) {
            getSessionByToken(token, function (sessionEntry) {
                if (sessionEntry == null) {
                    database_1.default('sessions')
                        .insert({
                        user_id: userID,
                        token: token,
                    })
                        .then(function (res) {
                        if (res[0] != null) {
                            console.log('[*] Session Created for @' + userID);
                            return cb(token);
                        }
                        else {
                            return cb(null);
                        }
                    })
                        .catch(function (err) {
                        if (err) {
                            return createSession(userID, cb);
                        }
                    });
                }
                else {
                    return createSession(userID, cb);
                }
            });
        }
        else {
            return cb(null);
        }
    });
}
exports.default = { createSession: createSession, getSessionByToken: getSessionByToken };
//# sourceMappingURL=session.js.map