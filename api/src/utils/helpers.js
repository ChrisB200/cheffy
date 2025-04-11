const models = require("../../sequelize")
const fs = require('fs');

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

function checkFileExists(file) {
  return fs.promises.access(file, fs.constants.F_OK)
           .then(() => true)
           .catch(() => false)
}

module.exports = { getUser, checkFileExists }
