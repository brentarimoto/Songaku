'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const songs =[
      {title:'song', userId:1, album:'album', url:'', genreId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('Songs', songs, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
