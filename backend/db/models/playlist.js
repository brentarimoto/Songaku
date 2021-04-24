'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: {
      type: DataTypes.INTEGER
    },
    musicId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50)
    }
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};