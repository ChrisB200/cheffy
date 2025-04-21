const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      prep: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"],
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};
