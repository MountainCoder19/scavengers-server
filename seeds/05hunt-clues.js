
exports.seed = function(knex, Promise) {
  return knex('hunt_clues')
  .del()
    .then(function () {
      return knex('hunt_clues').insert([
        {
          hunt_id: 1,
          clue_id: 1
        },
        {
          hunt_id:1,
          clue_id:2
        },
        {
          hunt_id:1,
          clue_id:3
        },
        {
          hunt_id:1,
          clue_id:4
        },
        {
          hunt_id:1,
          clue_id:5
        },
        {
          hunt_id:1,
          clue_id:6
        },
        {
          hunt_id:1,
          clue_id:7
        },
        {
          hunt_id:1,
          clue_id:8
        },
        {
          hunt_id:1,
          clue_id:9
        },
        {
          hunt_id:1,
          clue_id:10
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('hunt_clues_id_seq', (SELECT MAX(id) FROM hunt_clues));");
    });
};
