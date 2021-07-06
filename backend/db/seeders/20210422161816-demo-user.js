'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoTime = bcrypt.hashSync('demoTime', 10);
    const password = bcrypt.hashSync('songaku', 10);

    let users = [
      { userName: 'DemoUser', email: 'Demo@User.net', hashedPassword: demoTime, firstName:'Demo', lastName:'User', profilePic:null, about: "Music From: www.FesliyanStudios.com",profilePic:'https://songakubucket.s3.us-west-1.amazonaws.com/KurokoDog.jpg', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'AhjayStelino', email: 'ahjay@stelino.com', hashedPassword: password, firstName:'Ahjay', lastName:'Stelino', profilePic:'https://placekitten.com/400/400', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'AlejandroMagana', email: 'alejandro@magana.com', hashedPassword: password, firstName:'Alejandro', lastName:'Magana', profilePic:'https://placekitten.com/401/401', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'Arulo', email: 'arulo@arulo.com', hashedPassword: password, firstName:null, lastName: null, profilePic:'https://placekitten.com/402/402', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'BenSound', email: 'Ben@Sound.com', hashedPassword: password, firstName:'Ben', lastName:'Sound', profilePic:'https://placekitten.com/402/402', about: 'Attribution: Music: https://www.bensound.com' , createdAt: new Date(), updatedAt: new Date()},
      { userName: 'fesliyanstudios', email: 'fesliyan@studios.com', hashedPassword: password, firstName: null, lastName: null, profilePic:'https://placekitten.com/403/403', about: "Music From: www.FesliyanStudios.com", createdAt: new Date(), updatedAt: new Date()},
      { userName: 'LilyJ', email: 'lily@j.com', hashedPassword: password, firstName:'Lily', lastName:'J', profilePic:'https://placekitten.com/404/404', createdAt: new Date(), updatedAt: new Date()},
      { userName: 'noahshokaudio', email: 'noahat3@gmail.com', hashedPassword: password, firstName:'Noah', lastName:'Thomas', profilePic:'https://placekitten.com/405/405', createdAt: new Date(), updatedAt: new Date()},
      { userName: 'bnpt', email: 'noah@brent.com', hashedPassword: password, firstName:'Phoebe', lastName:'Tyler', profilePic:'https://placekitten.com/406/406', createdAt: new Date(), updatedAt: new Date()},
      { userName: 'jesse73&9wong', email: 'wong@shington.com', hashedPassword: password, firstName:'Jesse', profilePic:'https://placekitten.com/407/407', lastName:'Wong', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'myNameGeoffrey', email: 'goo@tieno.com', hashedPassword: password, firstName:'Geoffrey', lastName:'Otieno', profilePic:'https://placekitten.com/408/408', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'kpThaSavage', email: 'Kyle@Powers.com', hashedPassword: password, firstName:'Kyle', lastName:'Powers', profilePic:'https://placekitten.com/409/409', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'arimotoChan', email: 'Brent@Arimoto.com', hashedPassword: password, firstName:'Brent', lastName:'Arimoto', profilePic:'https://placekitten.com/410/410', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'scrumMaster', email: 'Kevin@Zheng.com', hashedPassword: password, firstName:'Kevin', lastName:'Zheng', profilePic:'https://placekitten.com/411/411', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'FlyGuy', email: 'James@Lentzsch.com', hashedPassword: password, firstName:'James', lastName:'Lentzsch', profilePic:'https://placekitten.com/412/412', createdAt: new Date(), updatedAt: new Date() },
    ];

    const randoms = 40;

    for (let i = 16; i < randoms; i++) {
      let newUser = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync("password", 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profilePic:`https://placekitten.com/${412+i}/${412+i}`,
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