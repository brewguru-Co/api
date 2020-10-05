const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    batchId: {
      allowNull: false,
      references: {
        model: 'batchs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    min: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    max: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    action: {
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
