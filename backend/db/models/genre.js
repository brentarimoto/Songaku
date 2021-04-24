'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
    },
  }, {});
  Genre.associate = function(models) {
    Genre.hasMany(models.Song, {foreignKey: 'genreId'})
  };
  return Genre;
};