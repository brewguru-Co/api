const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tanks', {
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
    teaId: {
      allowNull: false,
      references: {
        model: 'teas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
    },
    tempHigh: {
      type: Sequelize.FLOAT,
    },
    tempLow: {
      type: Sequelize.FLOAT,
    },
    phHigh: {
      type: Sequelize.FLOAT,
    },
    phLow: {
      type: Sequelize.FLOAT,
    },
    doxHigh: {
      type: Sequelize.FLOAT,
    },
    doxLow: {
      type: Sequelize.FLOAT,
    },
    brixHigh: {
      type: Sequelize.FLOAT,
    },
    brixLow: {
      type: Sequelize.FLOAT,
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
  down: (queryInterface) => queryInterface.dropTable('tanks'),
};
