import * as Knex from 'knex';
import faker from 'faker';
import bcrypt from 'bcrypt';

function createProjectObject(_id: number, _userID: number): {} {
    const id = _id;
    const title = faker.lorem.words(2);
    const content = faker.lorem.paragraphs(2).toString();
    const likes = Math.random() * 70;

    return {
        id: id,
        title: title,
        content: content,
        likes: likes,
        userID: _userID,
    };
}

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex('projects')
        .del()
        .then(() => {
            const projects: any[] = [];

            for (let i = 1; i < 50; i++) {
                projects.push(createProjectObject(i, Math.random() * 98));
            }

            return knex('projects').insert(projects);
        });
}
