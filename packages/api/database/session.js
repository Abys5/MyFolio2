const db = require('../database');

const uidgenerator = require('uid-generator');
const uidgen = new uidgenerator(512, uidgenerator.BASE58);

function createSession(userID, cb) {
    var token = uidgen.generateSync();

    db('users')
        .select()
        .where({ id: userID })
        .then(ret => {
            var user = ret[0];
            if (user) {
                if (getSessionByToken(token) == null) {
                    db('sessions')
                        .insert({
                            user_id: userID,
                            token: token,
                        })
                        .then(res => {
                            if (res[0] != null) {
                                console.log(
                                    '[*] Session Created for @' + userID,
                                );
                                return cb(token);
                            } else {
                                return cb(null);
                            }
                        })
                        .catch(err => {
                            if (err.code == 'ER_DUP_ENTRY') {
                                return createSession(userID);
                            } else {
                                throw err;
                            }
                        });
                } else {
                    return createSession(userID);
                }
            } else {
                return cb(null);
            }
        });
}

function getSessionByToken(token) {
    db('sessions')
        .select('*')
        .where({ token: token })
        .then(ret => {
            if (ret[0]) {
                return ret[0];
            } else {
                return null;
            }
        });
}

module.exports = { createSession, getSessionByToken };
