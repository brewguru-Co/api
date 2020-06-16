'use strict';
module.exports = (sequelize, DataTypes) => {
  const tea = sequelize.define('tea', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    tempHighOp: DataTypes.FLOAT,
    tempLowOp: DataTypes.FLOAT,
    phHighOp: DataTypes.FLOAT,
    phLowOp: DataTypes.FLOAT,
    doHighOp: DataTypes.INTEGER,
    doLowOp: DataTypes.INTEGER,
    brixHighOp: DataTypes.INTEGER,
    brixLowOp: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    }
  }, {});
  tea.associate = function(models) {
    // associations can be defined here
    tea.hasMany(models.tank);
  };
  return tea;
};