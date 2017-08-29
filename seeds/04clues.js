
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clues').del()
    .then(function () {
      // Inserts seed entries
      return knex('clues').insert([
        {
          description: 'clue number 1',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 2',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 3',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 4',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 5',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 6',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 7',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 8',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 9',
          photo_url: 'placeholderurl'
        },
        {
          description: 'clue number 10',
          photo_url: 'placeholderurl'
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('clues_id_seq', (SELECT MAX(id) FROM clues));");
    });
};
