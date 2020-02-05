exports.up = function(knex) {
  return knex.schema
    .createTable("pets", tbl => {
      tbl.increments();
      tbl
        .string("name", 255)
        .notNullable()
        .unique();
      tbl.string("status");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("meals", tbl => {
      tbl
        .integer("pet_id")
        .unsigned()
        // .notNullable()
        .references("id")
        .inTable("pets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pets");
};
