<template>
  <v-container>
    <div id="home">
      <nav>
        <header>
        </header>
        <router-link to="/"></router-link>
        <router-link to="/notice-list" style="color: black;">공지사항</router-link>
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
