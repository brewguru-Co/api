module.exports = (sequelize, DataTypes) => {
  const batch = sequelize.define(
    'batch',
    {
      temp: DataTypes.FLOAT,
      ph: DataTypes.FLOAT,
      dox: DataTypes.FLOAT,
      brix: DataTypes.FLOAT,
      hasError: {
        allowNull: false,
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      finishedAt: DataTypes.DATE,
    },
    {
      tableName: 'batchs',
    },
  );
  batch.associate = (models) => {
    // associations can be defined here
    batch.hasMany(models.notification);
    models.batch.belongsTo(models.tea, {
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    models.batch.belongsTo(models.tank, {
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return batch;
};
