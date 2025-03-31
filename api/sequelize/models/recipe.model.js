const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      prep: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      cook: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"],
        allowNull: false
      },
    },
    {
      timestamps: false
    }
  )
}
