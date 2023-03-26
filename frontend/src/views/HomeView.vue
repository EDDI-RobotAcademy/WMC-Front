<template>
  <div>
    <div>
      <MainBannerCarouselPage/>
    </div>
    <v-container>
      <div id="home">
        <nav>
          <header>
          </header>
          <router-link></router-link>
          <MainProductListPage/>
        </nav>
        <router-view/>
      </div>
    </v-container>
    </div>
</template>
<script>
import MainBannerCarouselPage from '@/components/carousel/MainBannerCarouselPage.vue';
//import ProductListPage from '@/views/product/ProductListPage.vue'
import MainProductListPage from '@/views/product/MainProductListPage.vue';
  export default {
    name: 'Home',
    
    components: {
     MainBannerCarouselPage,
     //ProductListPage,
     MainProductListPage,
     
    },
  }
</script>
