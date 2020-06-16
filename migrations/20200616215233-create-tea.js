'use strict';
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
        type: Sequelize.STRING,
        unique: true,
      },
      temp_high_op: {
        type: Sequelize.FLOAT
      },
      temp_low_op: {
        type: Sequelize.FLOAT
      },
      ph_high_op: {
        type: Sequelize.FLOAT
      },
      ph_low_op: {
        type: Sequelize.FLOAT
      },
      do_high_op: {
        type: Sequelize.INTEGER
      },
      do_low_op: {
        type: Sequelize.INTEGER
      },
      brix_high_op: {
        type: Sequelize.INTEGER
      },
      brix_low_op: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teas');
  }
};