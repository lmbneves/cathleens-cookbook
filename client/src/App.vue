<template>
  <v-app>
    <!-- <v-app-bar> -->

    <v-main>
      <RecipeList :recipes="recipes"/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import RecipeList from './components/RecipeList';

export default {
  name: 'App',
  components: {
    RecipeList,
  },
  data: () => ({
    recipes: null
  }),
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
};
</script>