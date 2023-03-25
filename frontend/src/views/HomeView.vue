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
