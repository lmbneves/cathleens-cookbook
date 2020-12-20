const express = require('express');
const router = express.Router();
const Recipe = require('./recipe');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    prep_time: req.body.prep_time,
    cook_time: req.body.cook_time,
    servings: req.body.servings,
    description: req.body.description,
    ingredients: req.body.ingredients,
    directions: req.body.directions
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;