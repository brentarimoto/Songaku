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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    Song.hasMany(models.Comment, {foreignKey: 'songId', onDelete: 'cascade', hooks: true})
    Song.hasMany(models.Like, {foreignKey: 'songId', onDelete: 'cascade', hooks: true})

    Song.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Song.belongsTo(models.Album, {foreignKey: 'albumId', onDelete: 'cascade'})

    // Song.belongsToMany(models.User, {
    //   through: "Comment",
    //   as: "UsersComments",
    //   foreignKey: "songId",
    //   otherKey: "userId",
    // });

    // Song.belongsToMany(models.User, {
    //   through: "Like",
    //   as: "UsersLikes",
    //   foreignKey: "songId",
    //   otherKey: "userId",
    //   onDelete: 'cascade',
    //   hooks: true
    // });

    Song.belongsToMany(models.Playlist, {
      through: "PlaylistSong",
      as: "PlaylistWithSong",
      foreignKey: "songId",
      otherKey: "playlistId",
      onDelete: 'cascade'
    });

    Song.belongsTo(models.Genre, {foreignKey: 'genreId'})
  };
  return Song;
};