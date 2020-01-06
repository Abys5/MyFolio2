import db from '../database';
import bcrypt from 'bcrypt';

function getUserByID(id: number, cb: (userEntry: any) => any): void {
    db.select('*')
        .from('users')
        .where({ id })
        .then((rows: any[]) => {
            if (rows[0]) {
                return cb(rows[0]);
            } else {
                return cb(null);
            }
        });
}

function getUserByEmail(email: string, cb: (userEntry: any) => any): void {
    db('users')
        .select('*')
        .where({ email })
        .then((rows: any[]) => {
            if (rows[0]) {
                return cb(rows[0]);
            } else {
                return cb(null);
            }
        });
}

function getUserByUsername(username: string, cb: (userEntry: any) => any): void {
    db('users')
        .select('*')
        .where({ username })
        .then((rows: any[]) => {
            if (rows[0]) {
                return cb(rows[0]);
            } else {
                return cb(null);
            }
        });
}

function createUser(first_name: string, last_name: string, username: string, email: string, password: string, cb: (success: boolean) => any): void {
    getUserByEmail(email, userEntryEmail => {
        if (userEntryEmail == null) {
            getUserByUsername(username, userEntryUsername => {
                if (userEntryUsername == null) {
                    bcrypt.hash(password, 10, (err: Error, hash: string) => {
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
                            .then((rows: any[]) => {
                                if (rows[0] != null) {
                                    console.log('[*] User Created for @' + username);
                                    return cb(true);
                                } else {
                                    return cb(false);
                                }
                            })
                            .catch((err: any) => {
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

export default { getUserByID, getUserByEmail, createUser };
