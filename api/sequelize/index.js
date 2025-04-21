const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: 3306,
  logging: console.log
});


// get all models
const modelDefiners = [
  require("./models/user.model"),
  require("./models/recipe.model"),
  require("./models/step.model"),
  require("./models/unit.model"),
  require("./models/ingredient.model"),
  require("./models/rating.model"),
  require("./models/like.model"),
  require("./models/cuisine.model"),
  require("./models/bookmark.model"),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

// database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB()



module.exports = sequelize;
