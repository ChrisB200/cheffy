const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ratings",
    {
      number: {
        type: DataTypes.INTEGER,
        min: 1,
        max: 5,
      }
    },
    {
      timestamps: false
    }
  )
}
