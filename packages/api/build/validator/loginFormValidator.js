"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Validator = require('validator');
function default_1(data) {
    var errors = {
        email: '',
        password: '',
    };
    data.email = !Validator.isEmpty(data.email) ? data.email : '';
    data.password = !Validator.isEmpty(data.password) ? data.password : '';
    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    //Password Check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length > 0,
    };
}
exports.default = default_1;
//# sourceMappingURL=loginFormValidator.js.map