const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const session = require('./database/session');
const user = require('./database/user');

require('dotenv').config();

const PORT = process.env.LISTEN_PORT || 3000;

const db = require('./database');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    try {
        const token =
            req.headers['x-auth-token'] || req.cookies['x-auth-token'];

        if (token) {
            jwt.verify(token, process.env.SECRET, (err, payload) => {
                if (err) {
                    req.user = null;
                    next(err);
                }

                if (payload) {
                    session.getSessionByToken(payload.token, sessionEntry => {
                        if (sessionEntry != null) {
                            user.getUserByID(
                                sessionEntry.user_id,
                                userEntry => {
                                    if (userEntry != null) {
                                        req.user = userEntry;
                                        next();
                                    } else {
                                        req.user = null;
                                        next();
                                    }
                                },
                            );
                        } else {
                            req.user = null;
                            next();
                        }
                    });
                } else {
                    req.user = null;
                    next();
                }
            });
        }
    } catch (e) {
        req.user = null;
        next();
    }
    //next();
});

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log('[*] Express listening on Port: ' + PORT);
});
