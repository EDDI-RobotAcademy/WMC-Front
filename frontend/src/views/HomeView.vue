<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/"></router-link>
        
      </nav>
      <router-view/>
    </div>
  </v-container>
</template>
<script>

  export default {
    name: 'Home',

    components: {
    },
  }
</script>
