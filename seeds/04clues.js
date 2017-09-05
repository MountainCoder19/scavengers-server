
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clues').del()
    .then(function () {
      // Inserts seed entries
      return knex('clues').insert([
        {
          description: 'On the prowl for a bronze older lady? We\'re banking on the fact you might be able to find one here... sort of.',
          photo_url: 'clues_1123435983',
          photo_class: 'Cougar_Statue'
        },
        {
          description: 'Tailgating is rude on the highway, but this Chevy doesn\'t mind.',
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
          description: 'Gary, Bugs, Kermit, and your favorite Cleaver family member are all waiting to play leap frog with you.',
          photo_url: 'clues_302663712',
          photo_class: 'Pet_Park'
        },
        {
          description: 'Elken John. John Elkway. Whatever you call him - he\'s got a great rack.',
          photo_url: 'clues_1123435983',
          photo_class: 'Elk_Statue'
        },
        {
          description: 'Ever courted a floating head?',
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
