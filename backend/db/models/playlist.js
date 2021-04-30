'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: {
      type: DataTypes.INTEGER
    },
    songId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50)
    }
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Playlist.belongsTo(models.Song, {foreignKey: 'songId', onDelete: 'cascade'})
  };
  return Playlist;
};