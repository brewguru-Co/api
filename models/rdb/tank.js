module.exports = (sequelize, DataTypes) => {
  const tank = sequelize.define(
    'tank',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      tempHigh: DataTypes.FLOAT,
      tempLow: DataTypes.FLOAT,
      phHigh: DataTypes.FLOAT,
      phLow: DataTypes.FLOAT,
      doxHigh: DataTypes.FLOAT,
      doxLow: DataTypes.FLOAT,
      brixHigh: DataTypes.FLOAT,
      brixLow: DataTypes.FLOAT,
    },
    {},
  );
  tank.associate = (models) => {
    // associations can be defined here
    models.tank.belongsTo(models.tea, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    tank.hasMany(models.batch);
  };
  return tank;
};
