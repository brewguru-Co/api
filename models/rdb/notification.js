module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define(
    'notification',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      min: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      max: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      action: DataTypes.STRING,
    },
    {},
  );
  notification.associate = (models) => {
    // associations can be defined here
    models.notification.belongsTo(models.batch, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return notification;
};
