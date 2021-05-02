'use strict';
const models = require('../models')
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const playlists=[
      {userId:1, name:'Das pretty good', createdAt: new Date(), updatedAt: new Date()}
    ]

    const users = await models.User.findAll();

    for (let i = 0; i < 80; i++) {
      const randUser = Math.floor(Math.random() * (users.length - 1) + 1);
      let newPlaylist = {
        userId: randUser,
        name: faker.lorem.words(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      playlists.push(newPlaylist);
    }

    return queryInterface.bulkInsert('Playlists', playlists, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
