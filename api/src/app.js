const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const unit = require("./routes/unit");
const recipe = require("./routes/recipe");
const sequelize = require("../sequelize");
const morgan = require("morgan");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"))
app.use(morgan("dev"))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// routes
app.use("/", auth);
app.use("/", unit);
app.use("/", recipe)

module.exports = app;
