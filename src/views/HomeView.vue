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
            <router-link to="/question-board" style="color: black;">QA</router-link>|
          </header>
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

  export default {
    name: 'Home',
    
    components: {
     MainBannerCarouselPage,
     //ProductListPage,
     MainProductListPage,
     BodyBannerCarouselPage,
     
    },
  }
</script>

