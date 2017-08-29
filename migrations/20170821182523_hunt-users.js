exports.up = function(knex, Promise) {
  return knex.schema.createTable("hunt_users", (table)=>{
    table.increments();
    table.integer("total_points").notNullable().defaultTo(0);
    table.integer("user_id").notNullable();
    table.integer("hunt_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("hunt_users");
};
