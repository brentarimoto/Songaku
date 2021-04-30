'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    songId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Like.belongsTo(models.Song, {foreignKey: 'songId', onDelete: 'cascade'})
  };
  return Like;
};