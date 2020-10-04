const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('teas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    tempHighOp: {
      type: Sequelize.FLOAT,
    },
    tempLowOp: {
      type: Sequelize.FLOAT,
    },
    phHighOp: {
      type: Sequelize.FLOAT,
    },
    phLowOp: {
      type: Sequelize.FLOAT,
    },
    doxHighOp: {
      type: Sequelize.INTEGER,
    },
    doxLowOp: {
      type: Sequelize.INTEGER,
    },
    brixHighOp: {
      type: Sequelize.INTEGER,
    },
    brixLowOp: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('teas'),
};
