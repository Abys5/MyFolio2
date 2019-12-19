exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();

        table
            .string('username', 255)
            .unique()
            .notNullable();
        table
            .string('email')
            .unique()
            .notNullable();
        table.string('password').notNullable();

        table.string('image');
        table.string('description', 255).defaultTo('<BLANK>');

        table.boolean('isAdmin').defaultTo(false);

        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
