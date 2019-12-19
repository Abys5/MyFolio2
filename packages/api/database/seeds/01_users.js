const faker = require('faker');
const bcrypt = require('bcrypt');

require('dotenv').config();

faker.locale = 'en_GB';

function createUserObject(_id) {
    const id = _id;
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const username = faker.internet.userName([firstname]);
    const email = faker.internet.email([firstname, lastname]);
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

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            var users = [];

            for (let i = 1; i < 100; i++) {
                users.push(createUserObject(i));
            }

            return knex('users').insert(users);
        });
};
