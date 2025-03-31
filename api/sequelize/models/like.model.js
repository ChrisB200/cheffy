const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "likes",
    {
    },
    {
      timestamps: false
    }
  )
}
