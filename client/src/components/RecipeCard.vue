<template>
  <v-card>
    <router-link :to="{ path: '/recipes/' + recipe._id }">
      <v-img
        class="white--text align-end"
        height="200px"
        :src=recipe.img_url>
      </v-img>
    </router-link>
    
    <v-card-title class="recipe-card__title">{{ recipe.title }}</v-card-title>
    <v-card-text class="recipe-card__desc">
      {{ recipe.description }}
    </v-card-text>
    

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-menu offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            align="right"
            color="#6D5C88"
            icon
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item>
            <router-link 
              v-if="recipe.add_method === 'link'">
              <v-btn
                width="100%"
                depressed>
                Edit
              </v-btn>
            </router-link>
          </v-list-item> -->
          <v-list-item>
            <v-btn
              width="100%"
              depressed
              @click="deleteRecipe">
              Delete
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RecipeCard',
    props: {
      recipe: null
    },
    methods: {
      deleteRecipe: function () {
        axios
          .delete('http://localhost:3000/recipes/' + this.recipe._id)
          .then((res) => {
            console.log(res);
            location.reload();
          })
      }
    }
  }
</script>

<style scoped>
.recipe-card__edit a {
  text-decoration: none;
  width: 100%;
}

</style>