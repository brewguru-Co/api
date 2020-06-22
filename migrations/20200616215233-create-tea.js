'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      tempHighOp: {
        type: Sequelize.FLOAT
      },
      tempLowOp: {
        type: Sequelize.FLOAT
      },
      phHighOp: {
        type: Sequelize.FLOAT
      },
      phLowOp: {
        type: Sequelize.FLOAT
      },
      doHighOp: {
        type: Sequelize.INTEGER
      },
      doLowOp: {
        type: Sequelize.INTEGER
      },
      brixHighOp: {
        type: Sequelize.INTEGER
      },
      brixLowOp: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teas');
  }
};