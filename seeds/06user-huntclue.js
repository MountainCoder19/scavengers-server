
exports.seed = function(knex, Promise) {
  return knex('user_huntclue')
  .del()
    .then(function () {
      return knex('user_huntclue').insert([
        {
          hunt_id: 1,
          clue_id: 1,
          user_id:1,
          completed:false
        },
        {
          hunt_id:1,
          clue_id:2,
          user_id:1,
          completed:false
        },
        {
          hunt_id:1,
          clue_id:3,
          user_id:1,
          completed:false
        },
        {
          hunt_id:1,
          clue_id:4,
          user_id:1,
          completed:true
        },
        {
          hunt_id:1,
          clue_id:5,
          user_id:1,
          completed:true
        },
        {
          hunt_id:1,
          clue_id:6,
          user_id:1,
          completed:true
        },
        {
          hunt_id:1,
          clue_id:7,
          user_id:1,
          completed:false
        },
        {
          hunt_id:1,
          clue_id:8,
          user_id:1,
          completed:true
        },
        {
          hunt_id:1,
          clue_id:9,
          user_id:1,
          completed:false
        },
        {
          hunt_id:1,
          clue_id:10,
          user_id:1,
          completed:false
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('user_huntclue_id_seq', (SELECT MAX(id) FROM user_huntclue));");
    });
};
