const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  add_method: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  }, 

  // add method is by "hand"
  prep_time: {
    type: String,
    required: function() { return this.add_method === 'hand'; }
  },
  cook_time: {
    type: String,
    required: function() { return this.add_method === 'hand'; }
  },
  servings: {
    type: String,
    required: function() { return this.add_method === 'hand'; }
  },
  ingredients: {
    type: String,
    required: function() { return this.add_method === 'hand'; }
  },
  directions: {
    type: String,
    required: function() { return this.add_method === 'hand'; }
  },

  // add method is by "link"
  recipe_url: {
    type: String,
    required: function() { return this.add_method === 'link'; }
  },
  notes: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);