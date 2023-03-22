<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/"></router-link>
        <router-link to="/product-list-page">상품 게시판</router-link> |

        
      </nav>
      <router-view/>
    </div>
    <v-main>
      <MainBannerCarouselPage/>
      <BodyBannerCarouselPage/> 
    </v-main>
  </v-container>

</template>
<script>
import MainBannerCarouselPage from '@/components/carousel/MainBannerCarouselPage.vue';
import BodyBannerCarouselPage from '@/components/carousel/BodyBannerCarouselPage.vue';

  export default {
    name: 'Home',

    components: {
     MainBannerCarouselPage,
     BodyBannerCarouselPage,
    },
  }
</script>
