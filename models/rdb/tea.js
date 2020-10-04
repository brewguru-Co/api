module.exports = (sequelize, DataTypes) => {
  const tea = sequelize.define(
    'tea',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      tempHighOp: DataTypes.FLOAT,
      tempLowOp: DataTypes.FLOAT,
      phHighOp: DataTypes.FLOAT,
      phLowOp: DataTypes.FLOAT,
      doxHighOp: DataTypes.INTEGER,
      doxLowOp: DataTypes.INTEGER,
      brixHighOp: DataTypes.INTEGER,
      brixLowOp: DataTypes.INTEGER,
    },
    {},
  );
  tea.associate = (models) => {
    // associations can be defined here
    tea.hasMany(models.tank);
  };
  return tea;
};
