const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const sequelize = require("../sequelize")

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/", auth)

module.exports = app;

