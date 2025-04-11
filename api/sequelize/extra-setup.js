// this is where we define the relationships
function applyExtraSetup(sequelize) {
  const { user, recipe, step, ingredient, unit, hashtag, recipeHashtag } = sequelize.models;

  user.hasMany(recipe, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.belongsTo(user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.hasMany(step, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.hasMany(ingredient, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // ingredient relationship
  ingredient.belongsTo(unit, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  })

  unit.hasMany(ingredient, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  recipe.belongsToMany(user, {
    through: "likes",
    onDelete: "CASCADE",
  });

  recipe.belongsToMany(user, {
    through: "ratings",
    onDelete: "CASCADE",
  });

  hashtag.belongsToMany(recipe, {
    through: "recipeHashtags",
    onDelete: "RESTRICT",
  });
}

module.exports = { applyExtraSetup };
