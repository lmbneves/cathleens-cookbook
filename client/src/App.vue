<template>
  <v-app>
    <v-app-bar flat app class="navbar">
      <v-container>
        <v-layout>
          <router-link to="/">
            <v-icon>mdi-book-open-page-variant-outline</v-icon>
            <span class="app-name">Cathleen's Cookbook</span>
          </router-link>
          <v-spacer></v-spacer>
          <router-link to="/add-recipe">
            <v-btn depressed>
              <v-icon left>mdi-book-plus-outline</v-icon>
              Add recipe
            </v-btn>
          </router-link>
        </v-layout>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      //
    }
  }
};
</script>

<style scoped>
.navbar .app-name {
  color: rgb(41, 41, 41);
  margin-left: 10px;
}

.navbar a {
  text-decoration: none;
}
</style>