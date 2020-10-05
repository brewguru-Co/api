module.exports = (sequelize, DataTypes) => {
  const teaOffset = sequelize.define(
    'teaOffset',
    {
      temp: DataTypes.FLOAT,
      ph: DataTypes.FLOAT,
      dox: DataTypes.FLOAT,
      brix: DataTypes.FLOAT,
    },
    {},
  );
  teaOffset.associate = (models) => {
    // associations can be defined here
    models.teaOffset.belongsTo(models.tea, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return teaOffset;
};
