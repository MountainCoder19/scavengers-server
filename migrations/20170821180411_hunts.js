exports.up = function(knex, Promise) {
  return knex.schema.createTable("hunts", (table)=>{
    table.increments();
    table.string("name", 255).notNullable();
    table.string("description", 500).notNullable();
    table.integer("total_clues").notNullable();
    table.integer("total_points").notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("hunts");
};
