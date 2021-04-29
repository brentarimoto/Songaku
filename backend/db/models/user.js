'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique:true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    firstName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    lastName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    profilePic: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  User.prototype.toSafeObject = function(){
    const { id, userName, email, profilePic } = this;
    return {id, userName, email, profilePic}
  }

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          userName: credential,
          email: credential,
        },
      },
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ userName, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      userName,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };


  User.associate = function(models) {
    User.hasMany(models.Comment, {foreignKey: 'userId'})
    User.hasMany(models.Like, {foreignKey: 'userId'})
    User.hasMany(models.Playlist, {foreignKey: 'userId'})

    User.hasMany(models.Song, {foreignKey: 'userId'})

    User.belongsToMany(models.Song, {
      through: "Comment",
      as: "SongsCommentedOn",
      foreignKey: "userId",
      otherKey: "songId",
    });

    User.belongsToMany(models.Song, {
      through: "Like",
      as: "SongsLiked",
      foreignKey: "userId",
      otherKey: "songId",
    });

    User.belongsToMany(models.Song, {
      through: "Playlist",
      as: "SongsInPlaylists",
      foreignKey: "userId",
      otherKey: "songId",
    });

  };
  return User;
};