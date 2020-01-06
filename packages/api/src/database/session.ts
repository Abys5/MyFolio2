import db from '../database';

import uidgenerator from 'uid-generator';
import User from 'src/interfaces/User.interface';
const uidgen = new uidgenerator(512, uidgenerator.BASE58);

//TODO: CREATE SESSION INTERFACE

function getSessionByToken(
    token: string,
    cb: (sessionEntry: any) => any,
): void {
    db('sessions')
        .select('*')
        .where({ token: token })
        .then((ret: any[]) => {
            if (ret[0]) {
                return cb(ret[0]);
            } else {
                return cb(null);
            }
        });
}

function createSession(userID: number, cb: (res: any) => any): void {
    const token: string = uidgen.generateSync();

    db('users')
        .select()
        .where({ id: userID })
        .then((ret) => {
            const user: User = ret[0];
            if (user) {
                getSessionByToken(token, (sessionEntry) => {
                    if (sessionEntry == null) {
                        db('sessions')
                            .insert({
                                user_id: userID,
                                token: token,
                            })
                            .then((res: any) => {
                                if (res[0] != null) {
                                    console.log(
                                        '[*] Session Created for @' + userID,
                                    );
                                    return cb(token);
                                } else {
                                    return cb(null);
                                }
                            })
                            .catch((err: Error) => {
                                if (err) {
                                    return createSession(userID, cb);
                                }
                            });
                    } else {
                        return createSession(userID, cb);
                    }
                });
            } else {
                return cb(null);
            }
        });
}

export default { createSession, getSessionByToken };
