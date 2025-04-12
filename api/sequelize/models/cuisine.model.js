const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cuisine",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
  )
}

