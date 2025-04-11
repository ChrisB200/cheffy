const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "unit",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING(20),
      abbreviation: DataTypes.STRING(10),
      pluralAbbreviation: DataTypes.STRING(11)
    },
    {
      timestamps: false,
    }
  )
}
