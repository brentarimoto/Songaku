'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    musicId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};