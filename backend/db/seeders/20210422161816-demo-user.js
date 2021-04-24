'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoTime = bcrypt.hashSync('demoTime', 10);
    const password = bcrypt.hashSync('goodGames2!', 10);

    let users = [
      { userName: 'DemoUser', email: 'Demo@User.net', hashedPassword: demoTime, firstName:'Demo', lastName:'User', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'jesse73&9wong', email: 'wong@shington.com', hashedPassword: password, firstName:'Jesse', lastName:'Wong', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'myNameGeoffrey', email: 'goo@tieno.com', hashedPassword: password, firstName:'Geoffrey', lastName:'Otieno', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'kpThaSavage', email: 'Kyle@Powers.com', hashedPassword: password, firstName:'Kyle', lastName:'Powers', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'arimotoChanUwu', email: 'Brent@Arimoto.com', hashedPassword: password, firstName:'Brent', lastName:'Arimoto', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'scrumMaster', email: 'Kevin@Zheng.com', hashedPassword: password, firstName:'Kevin', lastName:'Zheng', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'FlyGuy', email: 'James@castingcouch.ent', hashedPassword: password, firstName:'James', lastName:'Lentzsch', createdAt: new Date(), updatedAt: new Date() },
    ];

    const randoms = 28;

    for (let i = 8; i < randoms; i++) {
      let newUser = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync("password", 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.push(newUser);

    }

    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};