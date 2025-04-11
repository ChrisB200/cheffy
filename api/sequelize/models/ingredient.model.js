const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ingredient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      timestamps: false
    }
  )
}
