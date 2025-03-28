const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { models } = require("../../sequelize")
const { protectedRoute } = require("../middleware/authMiddleware");

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const isUserEmail = models.user({where: {email}});
    if (isUserEmail) {
      res.status(403).json({ error: "Email already exists"});
    }

    const isUserName = models.user({where: {username}});
    if (isUserName) {
      res.status(403).json({ error: "Username already exists"});
    }

    const user = new models.user({ username, password: hashedPass, email });
    await user.save();

    res.status(201).json({ success: "User has been created" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ where: {email} });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Login failed" });
  }
});

router.get("/is_authenticated", protectedRoute, async (req, res) => {
  if (req.currentUser) {
    return res.status(200).json({ authenticated: true });
  }
  return res.status(401).json({ authenticated: false });
});




module.exports = router;
