"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
function getUserByID(id, cb) {
    database_1.default.select('*')
        .from('users')
        .where({ id: id })
        .then(function (rows) {
        if (rows[0]) {
            return cb(rows[0]);
        }
        else {
            return cb(null);
        }
    });
}
function getUserByEmail(email, cb) {
    database_1.default('users')
        .select('*')
        .where({ email: email })
        .then(function (rows) {
        if (rows[0]) {
            return cb(rows[0]);
        }
        else {
            return cb(null);
        }
    });
}
function getUserByUsername(username, cb) {
    database_1.default('users')
        .select('*')
        .where({ username: username })
        .then(function (rows) {
        if (rows[0]) {
            return cb(rows[0]);
        }
        else {
            return cb(null);
        }
    });
}
function createUser(first_name, last_name, username, email, password, cb) {
    getUserByEmail(email, function (userEntryEmail) {
        if (userEntryEmail == null) {
            getUserByUsername(username, function (userEntryUsername) {
                if (userEntryUsername == null) {
                    bcrypt_1.default.hash(password, 10, function (err, hash) {
                        if (err) {
                            throw err;
                        }
                        database_1.default('users')
                            .insert({
                            first_name: first_name,
                            last_name: last_name,
                            username: username,
                            email: email,
                            password: hash,
                        })
                            .then(function (rows) {
                            if (rows[0] != null) {
                                console.log('[*] User Created for @' + username);
                                return cb(true);
                            }
                            else {
                                return cb(false);
                            }
                        })
                            .catch(function (err) {
                            if (err.code == 'ER_DUP_ENTRY') {
                                return cb(false);
                            }
                            else {
                                throw err;
                            }
                        });
                    });
                }
                else {
                    return cb(false);
                }
            });
        }
        else {
            return cb(false);
        }
    });
}
exports.default = { getUserByID: getUserByID, getUserByEmail: getUserByEmail, createUser: createUser };
//# sourceMappingURL=user.js.map