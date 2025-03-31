const express = require("express");
const router = express.Router();
const { models } = require("../../sequelize");

router.get("/units", async (req, res) => {
  try {
    const units = await models.unit.findAll();
    res.status(200).json(units);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error});
  }
});

module.exports = router
