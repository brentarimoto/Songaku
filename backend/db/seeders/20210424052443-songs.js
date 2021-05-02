'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const songs =[
      {
        title:'Looking Up',
        userId:1,
        albumId:1,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937367262.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Tokyo Lo-Fi',
        userId:1,
        albumId:2,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937412576.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Dreaming Big',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937810036.mp3',
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Driving Ambition',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937845656.mp3',
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Feeling Happy',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937860338.mp3',
        genreId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Fun Times',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619937973922.mp3',
        genreId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Piano Reflections',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619938258851.mp3',
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Raising Me Higher',
        userId:2,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619938339317.mp3',
        genreId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Deep Meditation',
        userId:3,
        albumId:4,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619938818159.mp3',
        genreId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Hazy After Hours',
        userId:3,
        albumId:3,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939094867.mp3',
        genreId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Sleepy Cat',
        userId:3,
        albumId:4,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939125666.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Spirit in the Woods',
        userId:3,
        albumId:4,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939168999.mp3',
        genreId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Tech House Vibes',
        userId:3,
        albumId:4,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939186217.mp3',
        genreId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Valley Sunset',
        userId:3,
        albumId:4,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939205826.mp3',
        genreId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Cat Walk',
        userId:4,
        albumId:5,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939612706.mp3',
        genreId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'cpbd',
        userId:4,
        albumId:5,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939657590.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Complicated',
        userId:4,
        albumId:5,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939748663.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Island Beat',
        userId:4,
        albumId:5,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939800401.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Serene View',
        userId:4,
        albumId:5,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619939825953.mp3',
        genreId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'All That',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941406480.mp3',
        genreId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'A New Beginning',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941611728.mp3',
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Funky Suspense',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941627796.mp3',
        genreId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Going Higher',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941716967.mp3',
        genreId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Happy Rock',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941733428.mp3',
        genreId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Punky',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941766315.mp3',
        genreId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Retro Soul',
        userId:5,
        albumId:6,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619941779615.mp3',
        genreId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Chill Gaming',
        userId:6,
        albumId:7,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942312365.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Homework',
        userId:6,
        albumId:7,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942375362.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Vibes',
        userId:6,
        albumId:8,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942414140.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'Hip Hop',
        userId:7,
        albumId:9,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942765804.mp3',
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'HYAMLC',
        userId:8,
        albumId:10,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619942996860.wav',
        genreId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'SPTL',
        userId:8,
        albumId:10,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619943024538.wav',
        genreId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'XMAS Medley',
        userId:9,
        albumId:11,
        url:'https://songakubucket.s3-us-west-1.amazonaws.com/1619943246438.wav',
        genreId: 8,
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
