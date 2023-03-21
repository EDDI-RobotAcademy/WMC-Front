<template>
  <v-app>
    <navigation-menu-page/>
    <v-main>
      <MainBannerCarouselPage/>
      <router-view/>
      <TopButton/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/main/layoutForm/Footer.vue';
import NavigationMenuPage from '@/components/main/layoutForm/navigation/NavigationMenuPage.vue';
import TopButton from '@/components/pageButton/TopButton.vue';
import MainBannerCarouselPage from './components/carousel/MainBannerCarouselPage.vue';

//import NavigationView from '@/views/lecture/layoutForm/navigation/NavigationView.vue';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    NavigationMenuPage,
    Footer,
    TopButton,
    MainBannerCarouselPage,
},
};
</script>
