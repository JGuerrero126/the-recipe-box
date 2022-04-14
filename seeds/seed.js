const sequelize = require('../config/connection');
const recipeData = require('./recipeData');
const Recipe = require("../models/Recipe");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Recipe.bulkCreate(recipeData);


  process.exit(0);
};

seedAll();