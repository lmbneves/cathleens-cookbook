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
};
</script>