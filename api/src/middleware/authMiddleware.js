const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { models } = require("../../sequelize")
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function protectedRoute(req, res, next) {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(401).json({ error: "access denied "});
  }
  const token = auth.split(" ")[1];
  console.log(token)

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded)
    req.userId = decoded.userId;

    const user = await models.user.findOne({
      where: {
        id: req.userId
      }
    })
    req.currentUser = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
    console.log(error)
  }
}

module.exports = { protectedRoute };
