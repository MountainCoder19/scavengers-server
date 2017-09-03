exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_huntclue", (table)=>{
    table.increments();
    table.boolean("completed").notNullable();
    table.string("cloud_url", 500).defaultTo('http://s2.quickmeme.com/img/ec/ecaa666a4d31d4ca5b4a5209d1b8b221da5efa6c77bed2ac1b9f1a889d9a5cd5.jpg');
    table.integer("user_id").notNullable();
    table.integer("hunt_id").notNullable();
    table.integer("clue_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_huntclue");
};
