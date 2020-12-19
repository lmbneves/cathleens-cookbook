<template>
  <v-app>
    <!-- <v-app-bar> -->

    <v-main>
      <RecipeComposer />
    </v-main>
  </v-app>
</template>

<script>
import RecipeComposer from './components/RecipeComposer';

export default {
  name: 'App',
  components: {
    RecipeComposer,
  },
  data: () => ({
    //
  }),
};
</script>