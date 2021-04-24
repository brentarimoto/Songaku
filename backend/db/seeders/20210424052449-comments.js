'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const comments =[
      {userId: 1, songId:1, comment:'Noice', createdAt: new Date(), updatedAt: new Date()},
    ]

    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
