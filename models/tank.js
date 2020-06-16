'use strict';
module.exports = (sequelize, DataTypes) => {
  const tank = sequelize.define('tank', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    tempHigh: DataTypes.FLOAT,
    tempLow: DataTypes.FLOAT,
    phHigh: DataTypes.FLOAT,
    phLow: DataTypes.FLOAT,
    doHigh: DataTypes.INTEGER,
    doLow: DataTypes.INTEGER,
    brixHigh: DataTypes.INTEGER,
    brixLow: DataTypes.INTEGER,
    startedAt: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    }
  }, {});
  tank.associate = function(models) {
    // associations can be defined here
    models.tank.belongsTo(models.tea, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return tank;
};