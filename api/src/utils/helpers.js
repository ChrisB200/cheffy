const models = require("../../sequelize")

const getUser = async (req) => {
  const id = req.userId;
  const user = await models.user.findOne({
    where: {
      id: id
    }
  });

  if (!user) return null;
  if (user) return user;
}

module.exports = { getUser }
