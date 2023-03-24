<template>
 <div>
  <div>
    <MainBannerCarouselPage1/>

  </div>
  <div>
    <v-container>
      <div id="home">
        <nav>
          <router-link to="/"></router-link>
          <router-link to="/product-list-page">상품 게시판</router-link><br>
          <router-link to="/review-list-page">리뷰 게시판</router-link> 

        </nav>
        <router-view/>
      </div>
    </v-container>
  </div>
  <div>
    <BodyBannerCarouselPage/> 
  </div>
</div> 
</template>
<script>
import MainBannerCarouselPage1 from '@/components/carousel/MainBannerCarouselPage1.vue';
import BodyBannerCarouselPage from '@/components/carousel/BodyBannerCarouselPage.vue';
import ProductListPage from '@/views/product/ProductListPage.vue'
import ReviewListPage from '@/components/reviewBoard/ReviewListForm.vue';

  export default {
    name: 'Home',

    components: {
     MainBannerCarouselPage1,
     BodyBannerCarouselPage,
     ReviewListPage,
     ProductListPage,
     
    },
  }
</script>
