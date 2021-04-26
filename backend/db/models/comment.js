'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    songId: {
      allowNull: false,
      type:DataTypes.INTEGER,
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};