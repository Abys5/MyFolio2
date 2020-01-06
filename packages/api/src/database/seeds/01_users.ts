import * as Knex from 'knex';
import faker from 'faker';
import bcrypt from 'bcrypt';

function createUserObject(_id: number): {} {
    const id = _id;
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const username = faker.internet.userName(firstname, lastname);
    const email = faker.internet.email(firstname, lastname);
    const image = faker.image.avatar();

    const plainpwd = faker.random.alphaNumeric(32);

    const password = bcrypt.hashSync(plainpwd, 10);
    const desp = `Password is ${plainpwd}`;

    return {
        id: id,
        first_name: firstname,
        last_name: lastname,
        username: username,
        email: email,
        image: image,
        password: password,
        description: desp,
        isAdmin: false,
    };
}

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(() => {
            const users: any[] = [];

            for (let i = 1; i < 100; i++) {
                users.push(createUserObject(i));
            }

            return knex('users').insert(users);
        });
}
