'use strict';
const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const likes =[
    ]

    const users = await models.User.findAll();
    const songs = await models.Song.findAll();

    for (let i = 0; i < 200; i++) {
      const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
      const randSong = Math.floor(Math.random() * (songs.length - 1) + 1);
      let newLike = {
        userId: randUser,
        songId: randSong,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      likes.push(newLike);
    }

    return queryInterface.bulkInsert('Likes', likes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
