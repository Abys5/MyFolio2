import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entity/User';
import { UserRole } from '../../UserRoles';

define(User, (faker: typeof Faker, settings: { roles: UserRole[] }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const username = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(16);
    const image = faker.image.dataUri(480, 480);
    const description = password;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = password;
    user.image = image;
    user.description = description;
    user.roles = settings.roles;
    return user;
});
