'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const playlistSongs=[
      {playlistId:1, songId: 1, createdAt: new Date(), updatedAt: new Date()},
      {playlistId:1, songId: 2, createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('PlaylistSongs', playlistSongs , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
