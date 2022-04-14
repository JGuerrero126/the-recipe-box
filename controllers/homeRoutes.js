const router = require("express").Router();
const { Recipe } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({});

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(req.session);

    res.render("homepage", {
      recipes,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/recipes/:id", withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
    const recipeData = await Recipe.findByPk(req.params.id);
    const recipe = recipeData.get({ plain: true });
    console.log(recipe)

    res.render("recipe", {
      ...recipe,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
