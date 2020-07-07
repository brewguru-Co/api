module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    to: {
      type: DataTypes.STRING,
      unique: true,
    },
    on: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    sentAt: {
      type: DataTypes.DATE,
    },
  }, {});

  return notification;
};
