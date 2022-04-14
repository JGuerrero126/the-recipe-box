const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      name: req.body.name,
      serves: req.body.serves,
      prep_time: req.body.prep_Time,
      cook_time: req.body.cook_Time,
      rest_time: req.body.rest_Time,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      imageURL: req.body.photos,
      createdby: req.body.createdby,
    });
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No Recipe found!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;