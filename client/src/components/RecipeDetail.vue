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
          <div class="pt-6 pb-2 pl-6 pr-6 recipe-stats">
            <p>
              <v-icon class="recipe-stats__icon">mdi-alarm-check</v-icon>
              <span class="recipe-stats__content">{{ recipe.prep_time }}</span>
            </p>
            <p>
              <v-icon class="recipe-stats__icon">mdi-pot-steam</v-icon>
              <span class="recipe-stats__content">{{ recipe.cook_time }}</span>
            </p>
            <p>
              <v-icon class="recipe-stats__icon">mdi-account-multiple</v-icon>
              <span class="recipe-stats__content">{{ recipe.servings }}</span>
            </p>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="7">
          <h1 class="mb-2 recipe-title">{{ recipe.title }}</h1>
          <h3 class="recipe-subtitle">{{ recipe.description }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <div style="height: 20px;"></div>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="3">
          <h2 class="pb-4">Ingredients</h2>
          <p v-html="recipe.ingredients" class="recipe-ingredients__content"></p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="7">
          <h2 class="pb-4">Directions</h2>
          <p v-html="recipe.directions"></p>
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
.recipe-title {
  font-family: 'Oleo Script', sans-serif;
  font-size: 42pt;
  word-spacing: 3pt;
}

.recipe-subtitle {
  font-size: 14pt;
  font-weight: 300;
}

.recipe-stats {
  background-color: #E7E1F5;
  border-radius: 2px;
  font-weight: 700;
}

.recipe-stats__icon {
  margin-top: -4px;
}

.recipe-stats__content {
  display: inline-block;
  margin-left: 8px;
}

.recipe-ingredients__content {
  min-height: 200px;
  border-right: 1px solid #AFABC3;
}
</style>