'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})

    Playlist.belongsToMany(models.Song, {
      through: "PlaylistSong",
      as: "SongsInPlaylist",
      foreignKey: "playlistId",
      otherKey: "songId",
      onDelete: 'cascade',
    });
  };
  return Playlist;
};