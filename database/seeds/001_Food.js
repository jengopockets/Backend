
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('meals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
        {name: 'Children', date: '01/03/1992', servings:'9001', category:'Protein' },
      ]);
    });
};
