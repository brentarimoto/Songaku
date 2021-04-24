'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const playlists=[
      {userId:1, songId: 1, name:'mySongs', createdAt: new Date(), updatedAt: new Date()}
    ]

    return queryInterface.bulkInsert('Playlists', playlists, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
