
exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary()
    table.string("name", 100).notNull()
    table.string("email", 150).notNull()
    table.string("password").notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
