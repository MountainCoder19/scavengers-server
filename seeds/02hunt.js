
exports.seed = function(knex, Promise) {
  return knex('hunts')
  .del()
    .then(function () {
      return knex('hunts').insert([{
        name: 'Pearl Street Hunt',
        description: 'A scavenger hunt for unique items/places around downtown Boulder',
        total_clues: 10,
        total_points: 10
      },{
        name: 'Boulder Landmark Hunt',
        description: 'Find amazing landmarks around Scenic Boulder',
        total_clues: 12,
        total_points: 12
      }]);
    }).then(function(){
      return knex.raw("SELECT setval('hunts_id_seq', (SELECT MAX(id) FROM hunts));");
    });
};
