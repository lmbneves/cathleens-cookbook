<template>
  <v-container fluid class="recipes-container">
    <h1 align="center" class="mt-16 home-title">What are you craving?</h1>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          md="10">
          <v-chip-group
            v-model="cravings"
            multiple>
            <v-chip
              filter
              outlined
              :color="tag.color"
              :value="tag"
              v-for="(tag, index) in tag_list" v-bind:key="index">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <v-container class="mt-10">
      <v-row v-if="filteredRecipes.length > 0">
        <v-col
          cols="12"
          md="4"
          v-for="(recipe, index) in filteredRecipes" v-bind:key="index">
          <RecipeCard :recipe="recipe" />
        </v-col>
      </v-row>
      <v-row class="no-recipes-found" v-else>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          md="10">
          <h2 align="center" class="no-recipes-found__title mt-10">No recipes in these categories have been added yet. Sorry!</h2>
          <h4 align="center" class="no-recipes-found__subtitle mt-2">(Try a new filter, or text Abby and she'll get you the recipe you need).</h4>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import tag_map from '../assets/json/tags.json'
  import RecipeCard from './RecipeCard'
  
  export default {
    name: 'RecipeList',
    components: {
      RecipeCard
    },
    data: function () {
      return {
        recipes: [],
        cravings: [],
        tag_list: tag_map["tags"]
      }
    },
    methods: {
      getRecipes: function () {
        axios
          .get('https://protected-bastion-86315.herokuapp.com/recipes')
          .then((res) => {
            this.recipes = res.data;
          })
      }
    },
    computed: {
      filteredRecipes: function() {

        var temp = [];

        if (this.cravings.length == 0) {
          temp = this.recipes;
        } else {
          temp = this.recipes.filter((re) => {
            return (re.tags).some(item => ((this.cravings).map(a => a.name)).includes(item));
          });
        }

        return temp;
      }
    },
    mounted: function () {
      this.getRecipes();
    }
  }
</script>

<style scoped>
.home-title {
  font-family: 'Oleo Script', sans-serif;
  font-size: 42pt;
  line-height: 3rem;
}

.no-recipes-found__title {
  font-family: 'Oleo Script', sans-serif;
}

.no-recipes-found__subtitle {
  font-style: italic;
}
</style>