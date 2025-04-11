const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "step",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
}
