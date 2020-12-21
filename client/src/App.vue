<template>
  <v-app>
    <CCNavbar />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CCNavbar from './components/CCNavbar'

export default {
  name: 'App',
  components: { 
    CCNavbar
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