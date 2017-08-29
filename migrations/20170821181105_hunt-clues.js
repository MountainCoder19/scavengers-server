exports.up = function(knex, Promise) {
  return knex.schema.createTable("hunt_clues", (table)=>{
    table.increments();
    table.integer("hunt_id").notNullable();
    table.integer("clue_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("hunt_clues");
};
