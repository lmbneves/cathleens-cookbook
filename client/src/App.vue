<template>
  <v-app>
    <AppNavbar />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar'

export default {
  name: 'App',
  components: { 
    AppNavbar
  },
  data: function () {
    return {
      //
    }
  }
};
</script>

<style scoped>
html, body {
  color: #2D3040;
}

</style>