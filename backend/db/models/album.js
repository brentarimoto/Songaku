'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    url: {
      type: DataTypes.STRING(100),
    },
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Album.hasMany(models.Song, {foreignKey: 'albumId', onDelete: 'cascade', hooks:true})
  };
  return Album;
};