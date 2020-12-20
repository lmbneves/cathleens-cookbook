<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200.jpg">
      <v-card-title>{{ recipe.title }}</v-card-title>
    </v-img>
    
    <v-card-text class="text--primary">
      {{ recipe.description }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="orange"
        text>
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'RecipeCard',
    props: {
      recipe: null
    }
  }
</script>

<style scoped>

</style>