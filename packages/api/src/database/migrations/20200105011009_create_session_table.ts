import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('sessions', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table
            .string('token')
            .notNullable()
            .unique();

        table
            .integer('user_id')
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
    return knex.schema.dropTable('sessions');
}
