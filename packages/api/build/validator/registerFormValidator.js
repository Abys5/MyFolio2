"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Validator = require('validator');
function default_1(data) {
    var errors = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    };
    data.first_name = !Validator.isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !Validator.isEmpty(data.last_name) ? data.last_name : '';
    data.username = !Validator.isEmpty(data.username) ? data.username : '';
    data.email = !Validator.isEmpty(data.email) ? data.email : '';
    data.password = !Validator.isEmpty(data.password) ? data.password : '';
    //Username Check
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    //First Name Check
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First Name is required';
    }
    //Last Name Check
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last Name is required';
    }
    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    //Password Check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    else {
        //console.log(data.password.length);
        if (data.password.length < 8) {
            errors.password = 'Password has to be 8 or more characters';
        }
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length > 0,
    };
}
exports.default = default_1;
//# sourceMappingURL=registerFormValidator.js.map