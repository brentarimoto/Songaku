'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const albums=[
      {userId: 1, name: "The-David-Renda-Abum", url:null},
      {userId: 1, name: "The-Steven-Oxen-Album", url:null},
      {userId: 2, name: "mixKit", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937973947.jpg'},
      {userId: 3, name: "mixKit", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619938818183.jpg'},
      {userId: 4, name: "mixKit", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939612730.jpg'},
      {userId: 5, name: "BenSound", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941406500.jpg'},
      {userId: 6, name: "The-Devid-Fesliyan-Album", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942375365.jpg'},
      {userId: 6, name: "The-David-Renda-Abum", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942414142.jpg'},
      {userId: 7, name: "mixKit", url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942765830.jpg'},
      {userId: 8, name: "FamilyStuff", url:null},
      {userId: 9, name: "XMAS", url:null},
    ]
    return queryInterface.bulkInsert('Albums', albums, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
