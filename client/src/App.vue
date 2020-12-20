<template>
  <v-app>
    <v-app-bar flat app>
      <v-container>
        <v-layout>
          <v-icon>mdi-book-open-page-variant-outline</v-icon>
          <v-toolbar-title class="ml-2">Cathleen's Cookbook</v-toolbar-title>
        </v-layout>
      </v-container>
    </v-app-bar>

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

<style scoped>

</style>