<template>
  <v-app-bar 
    app
    color="#8372A6"
    dark 
    class="navbar">
    <v-container>
      <v-layout>
        <router-link to="/">
          <v-btn 
            color="#8372A6"
            depressed>
            <v-icon left>mdi-book-open-page-variant-outline</v-icon>
            <span class="app-name">Cathleen's Cookbook</span>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'NewRecipeHand' }">
          <v-btn 
            color="#8372A6"
            depressed>
            <v-icon left>mdi-book-plus-outline</v-icon>
            Add recipe
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'NewRecipeLink' }">
          <v-btn 
            color="#8372A6"
            depressed>
            <v-icon left>mdi-link-variant-plus</v-icon>
            Link recipe
          </v-btn>
        </router-link>
      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'CCNavbar',
  data: function () {
    return {
      //
    }
  }
};
</script>

<style scoped>
.navbar .app-name {
  margin-left: 5px;
  margin-top: 2px;
}

.navbar a {
  text-decoration: none;
}
</style>