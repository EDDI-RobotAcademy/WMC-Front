<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/">Home</router-link> |
      </nav>
      <router-view/>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'HomeView',

  components: {
  },
}

</script>