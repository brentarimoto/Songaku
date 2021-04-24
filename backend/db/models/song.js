'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    album: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'})

    Song.belongsToMany(models.User, {
      through: "Comment",
      as: "comments",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsToMany(models.User, {
      through: "Like",
      as: "likes",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsToMany(models.User, {
      through: "Playlist",
      as: "playists",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsTo(models.Genre, {foreignKey: 'genreId'})
  };
  return Song;
};