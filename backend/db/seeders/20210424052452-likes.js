'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const likes =[
      {userId:1, songId:1, createdAt: new Date(), updatedAt: new Date()},
      {userId:2, songId:1, createdAt: new Date(), updatedAt: new Date()},
      {userId:3, songId:1, createdAt: new Date(), updatedAt: new Date()},
      {userId:1, songId:2, createdAt: new Date(), updatedAt: new Date()},
    ]
    return queryInterface.bulkInsert('Likes', likes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
