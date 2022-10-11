
exports.up = function(knex) {
    return knex.schema.createTable("users_contacts", table => {
      table.integer("user_id").unsigned().notNull()
      table.integer("contact_id").unsigned().notNull()
      table.foreign("user_id").references("users.id").onDelete("CASCADE")
      table.foreign("contact_id").references("contacts.id").onDelete("CASCADE")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("users_contacts")
  };
  