'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        onDelete: 'cascade'
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Albums' },
        onDelete: 'cascade'
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique:true,
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Genres' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};