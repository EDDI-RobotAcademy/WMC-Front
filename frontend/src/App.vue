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
import NavigationMenuPage from '@/components/main/layoutForm/navigation/navBar.vue';
import TopButton from '@/components/pageButton/TopButton.vue';


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
    
  },
};
</script>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  padding: 10px;
  background-color: white;
}




</style>