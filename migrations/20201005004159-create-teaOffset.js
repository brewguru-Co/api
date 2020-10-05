const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('teaOffsets', {
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
      onDelete: 'CASCADE',
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
  down: (queryInterface) => queryInterface.dropTable('teaOffsets'),
};
