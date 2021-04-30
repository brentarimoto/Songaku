'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const songs =[
      {
        title:'Soul to Squeeze',
        userId:1,
        album:'Vibes',
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619639648573.mp3',
        img:'https://songakubucket.s3-us-west-1.amazonaws.com/1619639783741.jpeg',
        genreId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Xmas Medley',
        userId:1,
        album:'Vibes',
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619731619259.mp3',
        img:'https://songakubucket.s3-us-west-1.amazonaws.com/1619639783741.jpeg',
        genreId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    return queryInterface.bulkInsert('Songs', songs, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
