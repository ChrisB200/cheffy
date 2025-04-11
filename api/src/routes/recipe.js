const express = require("express");
const router = express.Router();
const { models } = require("../../sequelize");
const { protectedRoute } = require("../middleware/authMiddleware");
const storage = require("../middleware/multerMiddleware");
const upload = require("multer")({ storage });

router.post(
  "/recipe",
  [protectedRoute, upload.single("image")],
  async (req, res) => {
    const ingredients = JSON.parse(req.body.ingredients);
    const steps = JSON.parse(req.body.steps);
    const prep =
      parseInt(req.body.prepHours) * 60 + parseInt(req.body.prepMins);
    const cook =
      parseInt(req.body.cookHours) * 60 + parseInt(req.body.cookMins);

    ingredients.forEach((ingredient) => {
      ingredient.unitId = ingredient.unit.id;
    });

    try {
      await models.recipe.create(
        {
          title: req.body.recipe,
          prep: prep,
          cook: cook,
          difficulty: req.body.difficulty,
          ingredients: ingredients,
          path: req.file.filename,
          userId: req.userId,
          steps: steps.map((step, index) => {
            return {
              order: index,
              instruction: step,
            };
          }),
        },
        {
          include: ["ingredients", "steps"],
        },
      );

      res.status(201).json(req.body);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },
);

router.get("/recipe", async (req, res) => {
  try {
    const recipe = await models.recipe.findOne({
      where: {
        id: req.query.id,
      },
      include: [
        {
          model: models.user,
          attributes: ["id", "username"],
        },
        {
          model: models.ingredient,
          include: [{ model: models.unit }],
        },
        {
          model: models.step,
        }
      ],
    });

    if (!recipe) {
      res.status(404).json({ error: "recipe does not exist" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const recipes = await models.recipe.findAll({
      include: [
        {
          model: models.user,
          attributes: ["id", "username"],
        },
      ],
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
