const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "recipeHashtags",
    {},
    {
      timestamps: false
    }
  )
}
