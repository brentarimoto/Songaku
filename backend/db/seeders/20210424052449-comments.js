'use strict';
const models = require('../models')
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments =[
    ]

    const users = await models.User.findAll();
    const songs = await models.Song.findAll();

    for (let i = 0; i < 100; i++) {
      const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
      const randSong = Math.floor(Math.random() * (songs.length - 1) + 1);
      let newComment = {
        userId: randUser,
        songId: randSong,
        comment: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      comments.push(newComment);
    }

    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
