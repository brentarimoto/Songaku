'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const likes =[
      {userId:1, songId:1, createdAt: new Date(), updatedAt: new Date()}
    ]
    return queryInterface.bulkInsert('Likes', likes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
