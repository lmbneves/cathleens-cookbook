<template>
  <v-container fluid class="recipes-container">
    <h1 align="center" class="mt-10 mb-16">What's on the menu?</h1>
    <v-container>
      <v-layout>
        <v-flex d-flex xs12 sm6 md4>
          <RecipeCard v-for="(recipe, index) in recipes" v-bind:key="index" :recipe="recipe" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import RecipeCard from './RecipeCard'
  
  export default {
    name: 'RecipeList',
    components: {
      RecipeCard
    },
    data: function () {
      return {
        recipes: null
      }
    },
    methods: {
      getRecipes: function () {
        axios
          .get('http://localhost:3000/recipes')
          .then((res) => {
            this.recipes = res.data;
          })
      }
    },
    mounted: function () {
      this.getRecipes();
    }
  }
</script>

<style scoped>

</style>