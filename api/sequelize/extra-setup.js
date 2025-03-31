// this is where we define the relationships
function applyExtraSetup(sequelize) {
  const { user, recipe, step, ingredient, unit, hashtag, recipeHashtag } = sequelize.models;

  user.hasMany(recipe, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })

  recipe.hasMany(step, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })

  recipe.belongsToMany(user, {
    through: "likes",
    onDelete: "CASCADE"
  })

  recipe.belongsToMany(user, {
    through: "ratings",
    onDelete: "CASCADE"
  })

  recipe.hasMany(ingredient, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })

  unit.hasMany(ingredient, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  })

  hashtag.belongsToMany(recipe, {
    through: "recipeHashtags",
    onDelete: "RESTRICT"
  })

}

module.exports = { applyExtraSetup };
