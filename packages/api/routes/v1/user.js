const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../../database/user');
const session = require('../../database/session');

const loginFormValidator = require('../../validator/loginFormValidator');
const registerFormValidator = require('../../validator/registerFormValidator');

router.post('/', (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.json(req.user);
    } else {
        res.send('BAD');
    }
});

router.post('/login', (req, res) => {
    var { errors, isValid } = loginFormValidator(req.body);
    //console.log(Object.keys(errors).length);
    if (Object.keys(errors).length > 0) {
        return res.json({ errors });
    }

    if (!isValid) {
        return res.json({ errors: { form: 'Form is Invalid' } });
    }

    user.getUserByEmail(req.body.email, userEntry => {
        if (res != null) {
            bcrypt.compare(
                req.body.password,
                userEntry.password,
                (err, isSame) => {
                    if (err) {
                        throw err;
                    }

                    if (isSame) {
                        session.createSession(userEntry.id, token => {
                            jwt.sign(
                                { token },
                                process.env.SECRET,
                                {},
                                (err, jwtToken) => {
                                    return res.json({ token: jwtToken });
                                },
                            );
                        });
                    } else {
                        return res.json({
                            errors: { form: 'Credentials are Incorrect' },
                        });
                    }
                },
            );
        } else {
            return res.json({ errors: { form: 'Credentials are Incorrect' } });
        }
    });
});

router.post('/register', (req, res) => {
    var { errors, isValid } = registerFormValidator(req.body);
    //console.log(Object.keys(errors).length);
    if (Object.keys(errors).length > 0) {
        return res.json({ errors });
    }

    if (!isValid) {
        return res.json({ errors: { form: 'Form is Invalid' } });
    }

    user.createUser(
        req.body.first_name,
        req.body.last_name,
        req.body.username,
        req.body.email,
        req.body.password,
        result => {
            if (result) {
                res.json({ msg: 'User Created!' });
            } else {
                res.json({
                    errors: { form: 'Error Occured when creating user' },
                });
            }
        },
    );
});

module.exports = router;
