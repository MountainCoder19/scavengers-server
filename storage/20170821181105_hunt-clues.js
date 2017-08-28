exports.up = function(knex, Promise) {
  return knex.schema.createTable("hunt-clues", (table)=>{
    table.increments();
    table.integer("hunt_id").notNullable();
    table.integer("clue_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("hunt-clues");
};
