const Validator = require('validator');
const isEmpty = require('is-empty');

var errors = {};

module.exports = data => {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

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
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //Password Check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    } else {
        //console.log(data.password.length);
        if (data.password.length < 8) {
            errors.password = 'Password has to be 8 or more characters';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
