<template>
  <v-app>
    <navigation-menu-page/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/main/layoutForm/Footer.vue'
import NavigationMenuPage from '@/components/main/layoutForm/navigation/navBar.vue'


// import NavigationView from '@/views/lecture/layoutForm/navigation/NavigationView.vue';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    NavigationMenuPage,
    Footer,

  }
}
</script>

<style>
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  padding: 0px;
  background-color: white;

}

</style>
