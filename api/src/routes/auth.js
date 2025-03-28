const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware/authMiddleware");

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const user = new models.user({ username, password: hashedPass, email });
    await user.save();

    res.status(201).json({ success: "User has been created" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ email });

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

router.get("/test", protectedRoute, (req, res) => {
  return res.status(200).json({success: req.currentUser.username})
});


module.exports = router;
