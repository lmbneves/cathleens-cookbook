<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src=recipe.img_url>
    </v-img>
    
    <v-card-title class="recipe-card__title">{{ recipe.title }}</v-card-title>
    <v-card-text class="recipe-card__desc">
      {{ recipe.description }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ path: '/recipes/' + recipe._id }"
        color="#7C6A9C"
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