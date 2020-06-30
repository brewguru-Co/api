const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      unique: true,
      type: Sequelize.STRING,
    },
    phone: {
      unique: true,
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
  down: (queryInterface) => queryInterface.dropTable('notifications'),
};
