const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const unit = require("./routes/unit");
const sequelize = require("../sequelize");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// routes
app.use("/", auth);
app.use("/", unit);

module.exports = app;
