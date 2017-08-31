exports.up = function(knex, Promise) {
  return knex.schema.createTable("clues", (table)=>{
    table.increments();
    table.string("description", 500).notNullable();
    table.string("photo_url", 500).notNullable();
    table.string("photo_class", 500).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clues");
};
