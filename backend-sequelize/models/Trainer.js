const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Trainer = sequelize.define('Trainer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'trainer',
    timestamps: false,
  });

  return Trainer;
};
