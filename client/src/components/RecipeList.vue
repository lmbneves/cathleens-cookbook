<template>
  <div class="recipes-container">
    <h1>Recipe List</h1>
    <p v-for="(recipe, index) in recipes" v-bind:key="index">{{ recipe.title }}</p>
  </div>
</template>

<script>
  export default {
    name: 'RecipeList',
    props: {
      recipes: Array
    }
  }
</script>

<style scoped>

</style>