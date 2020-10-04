const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notificationTargets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      unique: true,
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    on: {
      allowNull: false,
      defaultValue: 1,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('notificationTargets'),
};
