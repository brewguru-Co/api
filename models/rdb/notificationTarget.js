module.exports = (sequelize, DataTypes) => {
  const notificationTarget = sequelize.define(
    'notificationTarget',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      on: {
        allowNull: false,
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
      },
    },
    {},
  );

  return notificationTarget;
};
