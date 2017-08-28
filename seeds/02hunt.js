
exports.seed = function(knex, Promise) {
  return knex('hunts')
  .del()
    .then(function () {
      return knex('hunts').insert([{
        name: 'Test Hunt',
        description: 'This is the test hunt for image recognition',
        total_clues: 10,
        total_points: 10
      }]);
    }).then(function(){
      return knex.raw("SELECT setval('hunts_id_seq', (SELECT MAX(id) FROM hunts));");
    });
};
