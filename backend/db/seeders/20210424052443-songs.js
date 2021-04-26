'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const songs =[
      {
        title:'song',
        userId:1,
        album:'album',
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/S2S+(Mix+1).mp3',
        img:'https://pbs.twimg.com/profile_images/480894518540005376/7XCp52sK.jpeg',
        genreId: 1,
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
