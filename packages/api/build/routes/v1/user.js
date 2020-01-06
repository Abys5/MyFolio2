"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../../database/user"));
var session_1 = __importDefault(require("../../database/session"));
var loginFormValidator_1 = __importDefault(require("../../validator/loginFormValidator"));
var registerFormValidator_1 = __importDefault(require("../../validator/registerFormValidator"));
exports.default = (function () {
    var UserRouter = express_1.default.Router();
    UserRouter.post('/', function (req, res) {
        console.log(req.user);
        if (req.user) {
            res.json(req.user);
        }
        else {
            res.send('BAD');
        }
    });
    UserRouter.post('/login', function (req, res) {
        var _a = loginFormValidator_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
        //console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            return res.json({ errors: errors });
        }
        if (!isValid) {
            return res.json({ errors: { form: 'Form is Invalid' } });
        }
        user_1.default.getUserByEmail(req.body.email, function (userEntry) {
            if (userEntry != null) {
                bcrypt_1.default.compare(req.body.password, userEntry.password, function (err, isSame) {
                    if (err) {
                        throw err;
                    }
                    if (isSame) {
                        session_1.default.createSession(userEntry.id, function (token) {
                            jsonwebtoken_1.default.sign({ token: token }, process.env.SECRET, {}, function (err, jwtToken) {
                                if (err) {
                                    throw err;
                                }
                                return res.json({ token: jwtToken });
                            });
                        });
                    }
                    else {
                        return res.json({
                            errors: { form: 'Credentials are Incorrect' },
                        });
                    }
                });
            }
            else {
                return res.json({ errors: { form: 'Credentials are Incorrect' } });
            }
        });
    });
    UserRouter.post('/register', function (req, res) {
        var _a = registerFormValidator_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
        //console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            return res.json({ errors: errors });
        }
        if (!isValid) {
            return res.json({ errors: { form: 'Form is Invalid' } });
        }
        user_1.default.createUser(req.body.first_name, req.body.last_name, req.body.username, req.body.email, req.body.password, function (result) {
            if (result) {
                res.json({ msg: 'User Created!' });
            }
            else {
                res.json({
                    errors: { form: 'Error Occured when creating user' },
                });
            }
        });
    });
    return UserRouter;
});
//# sourceMappingURL=user.js.map