// this is where we define the relationships
function applyExtraSetup(sequelize) {
  const { user, recipe, step, ingredient, unit, cuisine, ratings, bookmarks } =
    sequelize.models;

  // user to recipe
  user.hasMany(recipe, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.belongsTo(user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // recipe to step
  recipe.hasMany(step, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // recipe to ingredient
  recipe.hasMany(ingredient, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // ingredient to unit relationship
  ingredient.belongsTo(unit, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  unit.hasMany(ingredient, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  recipe.belongsToMany(user, {
    through: "likes",
    onDelete: "CASCADE",
  });

  recipe.belongsTo(cuisine, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  cuisine.hasMany(recipe, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  // bookmarks relationships
  user.hasMany(bookmarks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  bookmarks.belongsTo(user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.hasMany(bookmarks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  bookmarks.belongsTo(recipe, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // ratings relationships
  user.hasMany(ratings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ratings.belongsTo(user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  recipe.hasMany(ratings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ratings.belongsTo(recipe, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}

module.exports = { applyExtraSetup };
