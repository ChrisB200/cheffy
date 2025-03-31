const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ingredient",
    {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      timestamps: false
    }
  )
}
