const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  prep_time: {
    type: String,
    required: true
  },
  cook_time: {
    type: String,
    required: true
  },
  servings: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  directions: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);