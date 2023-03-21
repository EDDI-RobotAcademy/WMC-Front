<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/"></router-link>
        <router-link to="/product-list-page">상품 게시판</router-link> |
        
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
