const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "hashtag",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING(15),
    },
    {
      timestamps: false
    }
  )
}
