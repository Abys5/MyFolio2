import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table.string('title').notNullable();

        table
            .string('content')
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

        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}
