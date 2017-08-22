exports.up = function(knex, Promise) {
  return knex.schema.createTable("user-huntclue", (table)=>{
    table.increments();
    table.boolean("completed").notNullable();
    table.integer("user_id").notNullable();
    table.integer("hunt_id").notNullable();
    table.integer("clue_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user-huntclue");
};
