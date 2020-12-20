<template>
  <v-container fluid class="recipes-container">
    <h1 align="center">What's on the menu?</h1>
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
  import RecipeCard from './RecipeCard'
  export default {
    name: 'RecipeList',
    components: {
      RecipeCard
    },
    props: {
      recipes: Array
    }
  }
</script>

<style scoped>

</style>