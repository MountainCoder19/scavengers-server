
exports.seed = function(knex, Promise) {
  return knex('hunt_users')
  .del()
    .then(function () {
      return knex('hunt_users').insert([{
        user_id: 1,
        hunt_id: 1
      }]);
    }).then(function(){
      return knex.raw("SELECT setval('hunt_users_id_seq', (SELECT MAX(id) FROM hunt_users));");
    });
};
