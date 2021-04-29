'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const comments =[
      {userId: 1, songId:1, comment:'Noice', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, songId:1, comment:'I Like it', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, songId:1, comment:'Again Noice', createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
