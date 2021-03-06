'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // const data = await fetch("https://api.deezer.com/version/service/id/method/?parameters");

    // const { results } = await data.json();

    let songs = [
      {name: 'Classical'},
      {name: 'Country'},
      {name: 'EDM'},
      {name: 'Hip-Hop'},
      {name: 'Indie rock'},
      {name: 'K-pop'},
      {name: 'Metal'},
      {name: 'Oldies'},
      {name: 'Pop'},
      {name: 'Jazz'},
      {name: 'R&B'},
      {name: 'Rock'},
      {name: 'Techno'},
      {name: 'Other'},
    ]

    return queryInterface.bulkInsert('Genres', songs, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
