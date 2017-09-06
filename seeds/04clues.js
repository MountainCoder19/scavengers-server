
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clues').del()
    .then(function () {
      // Inserts seed entries
      return knex('clues').insert([
        {
          description: 'I ain\'t saying she\'s a golddigger, but she is messing with a bronze cougar',
          photo_url: 'clues_1123435983',
          photo_class: 'Cougar_Statue'
        },
        {
          description: 'Take a load off on my Chevy Tailgate',
          photo_url: 'clues_1436159940',
          photo_class: 'Chevy_Bench'
        },
        {
          description: 'Where do you find the boldest rock shows downtown?',
          photo_url: 'clues_1436159940',
          photo_class: 'Boulder_Theater'
        },
        {
          description: 'The OG clock.',
          photo_url: 'clues_302663712',
          photo_class: 'Sun_Dial'
        },
        {
          description: 'Go play leap frog with your favorite neighborhood woodland creatures',
          photo_url: 'clues_302663712',
          photo_class: 'Pet_Park'
        },
        {
          description: 'Elken John. John Elkway. Whatever you call him - he\'s got a great rack.',
          photo_url: 'clues_1123435983',
          photo_class: 'Elk_Statue'
        },
        {
          description: 'This chief brings a whole new meaning to a figure "head"',
          photo_url: 'clues_1384175267',
          photo_class: 'Niwot_Chief'
        },
        {
          description: 'Here you can win the Bolder Boulder every time.',
          photo_url: 'clues_302663712',
          photo_class: 'Running_Mural'
        },
        {
          description: 'Stuck between a rock and a hard place?',
          photo_url: 'clues_1436159940',
          photo_class: 'Between_Rocks'
        },
        {
          description: 'Find the man trapped in the manhole.',
          photo_url: 'clues_1384175267',
          photo_class: 'Man_Hole'
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('clues_id_seq', (SELECT MAX(id) FROM clues));");
    });
};
