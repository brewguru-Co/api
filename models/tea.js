'use strict';
module.exports = (sequelize, DataTypes) => {
  const tea = sequelize.define('tea', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    temp_high_op: DataTypes.FLOAT,
    temp_low_op: DataTypes.FLOAT,
    ph_high_op: DataTypes.FLOAT,
    ph_low_op: DataTypes.FLOAT,
    do_high_op: DataTypes.INTEGER,
    do_low_op: DataTypes.INTEGER,
    brix_high_op: DataTypes.INTEGER,
    brix_low_op: DataTypes.INTEGER
  }, {});
  tea.associate = function(models) {
    // associations can be defined here
  };
  return tea;
};