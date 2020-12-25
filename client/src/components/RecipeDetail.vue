<template>
  <div class="recipe-viewer">
    <div class="recipe-image">
      <v-img
        width="100%"
        height="400px"
        :src="recipe.img_url"> 
      </v-img>
    </div>
    <!-- link view -->
    <template v-if="recipe.add_method === 'link'">
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            md="6">
            <h1 class="mt-4 mb-4 recipe-title">{{ recipe.title }}</h1>
            <h3 class="recipe-subtitle">{{ recipe.description }}</h3>
            <div class="recipe-chip__wrapper">
              <template v-for="tag in recipe.tags">
                <v-chip 
                  v-bind:key="tag"
                  outlined
                  :color="getTagColor(tag)"
                  class="recipe-chip">
                  <v-icon left small class="tag-chip__icon">{{ getTagIcon(tag) }}</v-icon>
                  {{ tag }}
                </v-chip>
              </template>
            </div>
            <div v-if="recipe.notes" class="mt-10">
              <br />
              <h2 class="pb-4">Notes</h2>
              <p v-html="recipe.notes"></p>
            </div> 
          </v-col>
          <v-col
            cols="12"
            md="2">
            <v-btn
              class="mt-4"
              color="#B28A82"
              dark
              x-large
              :href="recipe.recipe_url" target="_blank">
              <v-icon
                left>
                mdi-food-variant</v-icon>
              <span class="goto-recipe__link">Go to recipe</span>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </template>

    <!-- hand view -->
    <template v-else>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            md="8">
            <h1 class="mt-4 mb-4 recipe-title">{{ recipe.title }}</h1>
            <h3 class="recipe-subtitle">{{ recipe.description }}</h3>
            <div class="recipe-chip__wrapper">
              <template v-for="tag in recipe.tags">
                <v-chip 
                  v-bind:key="tag"
                  outlined
                  :color="getTagColor(tag)"
                  class="recipe-chip">
                  <v-icon left small class="tag-chip__icon">{{ getTagIcon(tag) }}</v-icon>
                  {{ tag }}
                </v-chip>
              </template>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="3">
            <div class="mt-3 pt-6 pb-2 pl-6 pr-6 recipe-stats">
              <p>
                <v-icon 
                  color="#2D3040"
                  class="recipe-stats__icon">mdi-alarm-check</v-icon>
                <span class="recipe-stats__content">{{ recipe.prep_time }}</span>
              </p>
              <p>
                <v-icon 
                  color="#2D3040" 
                  class="recipe-stats__icon">mdi-pot-steam</v-icon>
                <span class="recipe-stats__content">{{ recipe.cook_time }}</span>
              </p>
              <p>
                <v-icon 
                  color="#2D3040"
                  class="recipe-stats__icon">mdi-account-multiple</v-icon>
                <span class="recipe-stats__content">{{ recipe.servings }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <div style="height: 20px;"></div>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            md="3">
            <h2 class="pb-4">Ingredients</h2>
            <p v-html="recipe.ingredients" class="recipe-ingredients__content"></p>
          </v-col>
          <v-col
            cols="12"
            md="7">
            <h2 class="pb-4 recipe-directions__title">Directions</h2>
            <p v-html="recipe.directions" class="recipe-directions__content"></p>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import tag_map from '../assets/json/tags.json'

  export default {
    name: 'RecipeDetail',
    data: function () {
      return {
        recipe: null
      }
    },
    methods: {
      getTagIcon: function (tag) {
        var res = tag_map["tags"].find(obj => { return obj.name === tag });
        return res.icon;
      },
      getTagColor: function (tag) {
        var res = tag_map["tags"].find(obj => { return obj.name === tag });
        return res.color;
      },
      getRecipe: function () {
        axios
          .get('https://protected-bastion-86315.herokuapp.com/recipes/' + this.$route.params.id )
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
  line-height: 3rem;
  text-transform: capitalize;
}

.recipe-subtitle {
  font-size: 14pt;
  font-weight: 300;
  margin-left: 7px;
  font-style: italic;
}

.recipe-chip__wrapper {
  margin-top: 24px;
}

.recipe-chip {
  margin: 0px 4px;
}

.goto-recipe__link {
  margin-left: 4px;
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

.recipe-directions__title {
  padding-left: 46px;
}

.recipe-directions__content {
  min-height: 300px;
  border-left: 1px solid #AFABC3;
  padding-left: 40px;
}

.recipe-directions__content >>> ol {
  padding-right: 30px;
}

.recipe-directions__content >>> li {
  padding-left: 10px;
}

@media only screen and (max-width: 600px) {
  .recipe-directions__title {
    padding-left: 0px;
  }

  .recipe-directions__content {
    min-height: 400px;
    padding-left: 0px;
    border: 0px;
  }
}
</style>