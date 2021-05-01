'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const albums=[
      {userId: 1, name: 'Vibes', url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619639783741.jpeg'}
    ]
    return queryInterface.bulkInsert('Albums', albums, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
