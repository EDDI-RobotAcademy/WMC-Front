<template>
  <v-container>
    <div id="home">
      <nav>
        <header>
        </header>
        <router-link to="/"></router-link>
        <ProductListPage/>
      </nav>
      <router-view/>
    </div>
  </v-container>
</template>
<script>
import ProductListPage from '@/views/product/ProductListPage.vue'

  export default {
    name: 'Home',

    components: {
      ProductListPage,
    },
  }
</script>
