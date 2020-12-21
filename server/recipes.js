const express = require('express');
const router = express.Router();
const Recipe = require('./recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
})

// POST create one recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: formatTitle(req.body.title),
    prep_time: req.body.prep_time,
    cook_time: req.body.cook_time,
    servings: req.body.servings,
    description: formatDesc(req.body.description),
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    img_url: req.body.img_url
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update one recipe
router.patch('/:id', getRecipe, (req, res) => {
  
});

// DELETE remove one recipe
router.delete('/:id', getRecipe, (req, res) => {
  
});

async function getRecipe(req, res, next) {
  try {
    recipe = await Recipe.findById(req.params.id)
    if (recipe == null) {
      return res.status(404).json({ message: 'Cant find recipe'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.recipe = recipe
  next()
}

function formatTitle(str) {
  if (str.substring(str.length-1) == ".") {
    str = str.substring(0, myUrl.length-1);
  }

  return str;
}

function formatDesc(str) {
  if (str.substring(str.length-1) != "." || str.substring(str.length-1) != "!") {
    str += ".";
  }

  return str;
}

module.exports = router;