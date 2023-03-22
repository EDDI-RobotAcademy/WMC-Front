<template>
  <v-app>
    <navigation-menu-page/>
    <v-main>
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
import BodyBannerCarouselPage from './components/carousel/BodyBannerCarouselPage.vue';

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
    BodyBannerCarouselPage,
},
};
</script>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dropbtn {
  background-color: white;
  padding: 20px;
  font-size: 10px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: auto;
  padding: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-content a {
  margin-top: 10px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #E0E0E0;
}

.dropdown:hover .dropdown-content {
  display: block;


}

.dropdown:hover .dropbtn {
  background-color: #E0E0E0;
}

</style>