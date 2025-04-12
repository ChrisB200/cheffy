const express = require("express");
const router = express.Router();
const { models } = require("../../sequelize");
const { protectedRoute } = require("../middleware/authMiddleware");
const storage = require("../middleware/multerMiddleware");
const sequelize = require("../../sequelize");
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

      attributes: {
        include: [
          [
            sequelize.fn("AVG", sequelize.col("ratings.number")),
            "averageRating",
          ],
          [sequelize.fn("COUNT", sequelize.col("ratings.id")), "numberRatings"],
        ],
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
        },
        {
          model: models.cuisine,
        },
        {
          model: models.ratings,
          attributes: [],
        },
      ],
      group: ["recipe.id"],
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

router.get("/recipe/like", protectedRoute, async (req, res) => {
  try {
    const like = await models.likes.count({
      where: {
        recipeId: req.query.id,
        userId: req.userId,
      },
    });

    if (like === 1) {
      res.status(200).json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/recipe/bookmark", protectedRoute, async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ error: "Need to give a recipe" });
    }
    const bookmark = await models.bookmarks.count({
      where: {
        recipeId: req.query.id,
        userId: req.userId,
      },
    });

    if (bookmark === 1) {
      res.status(200).json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/recipe/rating", protectedRoute, async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ error: "A recipe ID was not given" });
    }

    const rating = await models.ratings.findOne({
      where: {
        recipeId: req.query.id,
        userId: req.currentUser.id,
      },
    });

    if (!rating.number) {
      res.status(200).json(false);
    }

    console.log(rating.number);

    res.status(200).json(rating.number);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/recipe/rating", protectedRoute, async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ error: "A recipe ID was not given" });
    }

    if (!req.query.number) {
      res.status(400).json({ error: "A rating number was not given" });
    }

    const rating = await models.ratings.findOne({
      where: {
        userId: req.currentUser.id,
        recipeId: req.query.id,
      },
    });

    if (!rating) {
      await models.ratings.create({
        userId: req.currentUser.id,
        recipeId: req.query.id,
        number: req.query.number,
      });
      res.status(200).json({ message: "Successfully created a new rating" });
    } else {
      await models.ratings.update(
        {
          number: req.query.number,
        },
        {
          where: {
            userId: req.currentUser.id,
            recipeId: req.query.id,
          },
        },
      );
      res.status(200).json({ message: "Rating updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/recipe/bookmark", protectedRoute, async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ error: "A recipe ID was not given" });
    }

    await models.bookmarks.create({
      userId: req.currentUser.id,
      recipeId: req.query.id,
    });
    res.status(200).json({ message: "Created a new bookmark successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/recipe/bookmark", protectedRoute, async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ error: "A recipe ID was not given" });
    }

    await models.bookmarks.destroy({
      where: {
        recipeId: req.query.id,
        userId: req.currentUser.id
      } 
    })

    res.status(204).send()
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;
