exports.up = function(knex) {
    return knex.schema.createTable('sessions', table => {
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
};

exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
};
