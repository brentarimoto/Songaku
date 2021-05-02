'use strict';
const models = require('../models')

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const playlistSongs=[
      {playlistId:1, songId: 2, createdAt: new Date(), updatedAt: new Date()},
    ]

    const playlists = await models.Playlist.findAll();
    const songs = await models.Song.findAll();

    for (let i = 0; i < 200; i++) {
      const randPlaylist = Math.floor(Math.random() * (playlists.length - 1) + 1);
      const randSong = Math.floor(Math.random() * (songs.length - 1) + 1);
      let newPlaylistSong = {
        playlistId: randPlaylist,
        songId: randSong,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      playlistSongs.push(newPlaylistSong);
    }

    return queryInterface.bulkInsert('PlaylistSongs', playlistSongs , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
