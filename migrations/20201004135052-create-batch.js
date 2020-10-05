const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('batchs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    teaId: {
      allowNull: false,
      references: {
        model: 'teas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      type: Sequelize.INTEGER,
    },
    tankId: {
      allowNull: false,
      references: {
        model: 'tanks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      type: Sequelize.INTEGER,
    },
    temp: {
      type: Sequelize.FLOAT,
    },
    ph: {
      type: Sequelize.FLOAT,
    },
    dox: {
      type: Sequelize.FLOAT,
    },
    brix: {
      type: Sequelize.FLOAT,
    },
    hasError: {
      defaultValue: 0,
      type: Sequelize.TINYINT(1),
      allowNull: false,
    },
    startedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    finishedAt: {
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('batchs'),
};
