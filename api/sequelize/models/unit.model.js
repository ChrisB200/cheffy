const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "unit",
    {
      name: DataTypes.STRING(20),
      abbreviation: DataTypes.STRING(10)
    },
    {
      timestamps: false,
    }
  )
}
