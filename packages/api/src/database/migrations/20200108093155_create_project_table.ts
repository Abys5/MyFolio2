import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('projects', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table.string('title').notNullable();

        table
            .string('content', 5000)
            .defaultTo('')
            .notNullable();

        table
            .integer('likes')
            .defaultTo(0)
            .notNullable();

        table
            .integer('userID')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('cascade');

        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}
