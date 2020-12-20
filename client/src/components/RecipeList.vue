<template>
  <div class="recipes-container">
    <p v-for="(recipe, index) in recipes" v-bind:key="index">{{recipe.title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'RecipeViewer',
    prop: {
      recipes: Array
    }
  }
</script>

<style scoped>

</style>