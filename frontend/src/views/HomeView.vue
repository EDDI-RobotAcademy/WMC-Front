<template>
  <div>
    <div>
      <MainBannerCarouselPage/>
    </div>
      <MainProductListPage/>
      <div>
        <BodyBannerCarouselPage/>
      </div>
    <v-container>
      <div id="home"></div>
        <nav>
          <header>
          </header>
          <MainProductListPage/>
          <router-link to="/"></router-link>
          <router-link to="/notice-list" style="color: black;">공지사항</router-link>|
          <router-link to="/review-list-page" style="color: black;">리뷰</router-link>|
          <BodyBannerCarouselPage/>
        </nav>
        <router-view/>
    </v-container>
    </div>
</template>
<script>
import MainBannerCarouselPage from '@/components/carousel/MainBannerCarouselPage.vue';
//import ProductListPage from '@/views/product/ProductListPage.vue'
import MainProductListPage from '@/views/product/MainProductListPage.vue';
import BodyBannerCarouselPage from '../components/carousel/BodyBannerCarouselPage.vue';
import ProductListPage from '@/views/product/ProductListPage.vue'
import ReviewListPage from '@/views/ReviewBoard/ReviewListPage.vue'
import BodyBannerCarouselPage from '@/components/carousel/BodyBannerCarouselPage.vue';

  export default {
    name: 'Home',
    
    components: {
     MainBannerCarouselPage,
     //ProductListPage,
     MainProductListPage,
     ProductListPage,
     ReviewListPage,
     BodyBannerCarouselPage,
     
    },
  }
</script>

