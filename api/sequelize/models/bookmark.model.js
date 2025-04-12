const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "bookmarks",
    {
    },
    {
      timestamps: false
    }
  )
}

