module.exports = (sequelize, DataTypes) => {
  const tea = sequelize.define('tea', {
    name: {
      allowNull: false,
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
  }, {});
  tea.associate = (models) => {
    // associations can be defined here
    tea.hasMany(models.tank);
  };
  return tea;
};
