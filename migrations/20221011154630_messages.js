
exports.up = function(knex) {
    return knex.schema.createTable("messages", table => {
      table.increments("id").primary()
      table.string("text").notNull()
      table.integer("contact_id").unsigned().notNull()
      table.integer("user_id").unsigned().notNull()
      table.foreign("contact_id").references("users.id").onDelete("CASCADE")
      table.foreign("user_id").references("users.id").onDelete("CASCADE")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("messages")
  };
  