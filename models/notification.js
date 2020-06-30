module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});

  return notification;
};
