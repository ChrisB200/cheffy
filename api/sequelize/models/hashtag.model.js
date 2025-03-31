const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "hashtag",
    {
      name: DataTypes.STRING(15),
    },
    {
      timestamps: false
    }
  )
}
