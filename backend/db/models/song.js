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
    img: {
      type: DataTypes.STRING(100),
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
      as: "UsersComments",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsToMany(models.User, {
      through: "Like",
      as: "UsersLikes",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsToMany(models.User, {
      through: "Playlist",
      as: "UsersPlaylists",
      foreignKey: "songId",
      otherKey: "userId",
    });

    Song.belongsTo(models.Genre, {foreignKey: 'genreId'})
  };
  return Song;
};