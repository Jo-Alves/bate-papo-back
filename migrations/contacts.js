
exports.up = function(knex) {
  return knex.schema.createTable("contacts", table => {
    table.increments("id").primary()
    table.integer("user_id").unsigned().notNull()
    table.foreign("user_id").references("users.id").onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("contacts")
};
