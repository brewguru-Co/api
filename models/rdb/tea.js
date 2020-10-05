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
      doxHighOp: DataTypes.FLOAT,
      doxLowOp: DataTypes.FLOAT,
      brixHighOp: DataTypes.FLOAT,
      brixLowOp: DataTypes.FLOAT,
    },
    {},
  );
  tea.associate = (models) => {
    // associations can be defined here
    tea.hasMany(models.tank);
    tea.hasMany(models.teaOffset);
    tea.hasMany(models.batch);
  };
  return tea;
};
