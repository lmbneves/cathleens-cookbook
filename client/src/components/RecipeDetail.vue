<template>
  <div class="recipe-viewer">
    <div class="recipe-header__wrapper">
      <v-img
        width="100%"
        height="400px"
        src="https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200.jpg">
       
          <div class="recipe-header__spacer"></div>
          <div class="recipe-header__content">
            <v-container class="recipe-header__inner">
              {{ recipe.title }}
            </v-container>
          </div>
        
      </v-img>
    </div>
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
.recipe-header__wrapper {
  width: 100%;
  
}

.recipe-header__spacer {
  height: 250px;
}

.recipe-header__content {
  height: 150px;
  background-color: rgba(255, 255, 255, 0.808);
}
</style>