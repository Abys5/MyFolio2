const db = require('../database');
const bcrypt = require('bcrypt');

function createUser(first_name, last_name, username, email, password, cb) {
    getUserByEmail(email, resp => {
        //console.log(resp);
        if (resp == null) {
            getUserByUsername(username, res => {
                if (res == null) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            throw err;
                        }

                        db('users')
                            .insert({
                                first_name,
                                last_name,
                                username,
                                email,
                                password: hash,
                            })
                            .then(res => {
                                if (res[0] != null) {
                                    console.log(
                                        '[*] User Created for @' + username,
                                    );
                                    return cb(true);
                                } else {
                                    return cb(false);
                                }
                            })
                            .catch(err => {
                                if (err.code == 'ER_DUP_ENTRY') {
                                    return cb(false);
                                } else {
                                    throw err;
                                }
                            });
                    });
                } else {
                    return cb(false);
                }
            });
        } else {
            return cb(false);
        }
    });
}

function getUserByID(id, cb) {
    db.select('*')
        .from('users')
        .where({ id })
        .then(rows => {
            if (rows[0]) {
                return cb(rows[0]);
            } else {
                return cb(null);
            }
        });
}

function getUserByEmail(email, cb) {
    db('users')
        .select('*')
        .where({ email })
        .then(ret => {
            if (ret[0]) {
                return cb(ret[0]);
            } else {
                return cb(null);
            }
        });
}

function getUserByUsername(username, cb) {
    db('users')
        .select('*')
        .where({ username })
        .then(ret => {
            if (ret[0]) {
                return cb(ret[0]);
            } else {
                return cb(null);
            }
        });
}

module.exports = { getUserByID, getUserByEmail, createUser };
