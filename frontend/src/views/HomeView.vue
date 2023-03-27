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
          <MainProductListPage/>
          <router-link to="/"></router-link>
          <router-link to="/notice-list" style="color: black;">공지사항</router-link>|
          <ProductListPage/>
          <BodyBannerCarouselPage/>
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
import ProductListPage from '@/views/product/ProductListPage.vue'
import BodyBannerCarouselPage from '@/components/carousel/BodyBannerCarouselPage.vue';

  export default {
    name: 'Home',
    
    components: {
     MainBannerCarouselPage,
     //ProductListPage,
     MainProductListPage,
     ProductListPage,
     BodyBannerCarouselPage,
     
    },
  }
</script>
