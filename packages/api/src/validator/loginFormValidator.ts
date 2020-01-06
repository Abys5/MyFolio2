// eslint-disable-next-line @typescript-eslint/no-var-requires
const Validator = require('validator');

export default function(data: { email: string; password: string }): { errors: {}; isValid: boolean } {
    const errors = {
        email: '',
        password: '',
    };

    data.email = !Validator.isEmpty(data.email) ? data.email : '';
    data.password = !Validator.isEmpty(data.password) ? data.password : '';

    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //Password Check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length > 0,
    };
}
