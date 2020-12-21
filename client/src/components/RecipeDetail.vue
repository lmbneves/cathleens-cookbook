<template>
  <div class="recipe-viewer">
    <div class="recipe-image">
      <v-img
        width="100%"
        height="400px"
        src="https://www.seriouseats.com/2017/02/20170216-detroit-style-pizza-47-1500x1125-1.jpg"> 
      </v-img>
    </div>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="3">
          <div class="pa-4 pb-1 recipe-stats">
            <p>Prep time: {{ recipe.prep_time }}</p>
            <p>Cook time: {{ recipe.cook_time }}</p>
            <p>Serves: {{ recipe.servings }}</p>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="7">
          <h1>{{ recipe.title }}</h1>
          <h3>{{ recipe.description }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="3">
          <h2 class="pb-4">Ingredients</h2>
          <p>{{ recipe.ingredients }}</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="7">
          <h2 class="pb-4">Directions</h2>
          <p>{{ recipe.directions }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RecipeDetail',
    data: function () {
      return {
        recipe: null
      }
    },
    methods: {
      getRecipe: function () {
        axios
          .get('http://localhost:3000/recipes/' + this.$route.params.id )
          .then((res) => {
            this.recipe = res.data;
          })
      }
    },
    mounted: function () {
      this.getRecipe();
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.recipe-stats {
  background-color: grey;
}
</style>