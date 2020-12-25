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
      <template v-for="tag in recipe.tags.slice(0, 3)">
        <v-chip 
          v-bind:key="tag"
          outlined
          :color="getTagColor(tag)"
          class="recipe-card__chip">
          <v-icon left small class="tag-chip__icon">{{ getTagIcon(tag) }}</v-icon>
          {{ tag }}
        </v-chip>
      </template>
      <v-spacer></v-spacer>
      <v-menu offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            align="right"
            color="#8372A6"
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
  import tag_map from '../assets/json/tags.json'

  export default {
    name: 'RecipeCard',
    props: {
      recipe: null
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
      deleteRecipe: function () {

        if (confirm("Are you sure you want to delete this recipe?")) {
          axios
            .delete('https://protected-bastion-86315.herokuapp.com/recipes/' + this.recipe._id)
            .then((res) => {
              console.log(res);
              location.reload();
            });
        }
      }
    }
  }
</script>

<style scoped>
.recipe-card__title {
  text-transform: capitalize;
}

.recipe-card__chip {
  margin: 0px 2px;
}

.recipe-card__edit a {
  text-decoration: none;
  width: 100%;
}

</style>