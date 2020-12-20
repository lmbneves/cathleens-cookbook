<template>
  <div class="recipe-viewer">
    <h1>Recipe Viewer</h1>
    <p v-for="(recipe, index) in recipes" v-bind:key="index">{{recipe.title}}</p>
    <button v-on:click="getRecipes">Refresh Recipes</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RecipeViewer',
    data: function () {
      return {
        recipes: null
      }
    },
    methods: {
      getRecipes: function () {
        axios
          .get('http://localhost:3000/recipes')
          .then(response => (this.recipes = response.data))
      }
    },
    mounted: function () {
        this.getRecipes();
    }
  }
</script>

<style scoped>

</style>