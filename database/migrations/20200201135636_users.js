exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })
    .createTable("meals", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.date("date");
      tbl.integer("servings");
      tbl.string("category");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("meals").dropTableIfExists("users");
};
