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
import Footer from '@/components/main/layoutForm/Footer.vue';
import NavigationMenuPage from '@/components/main/layoutForm/navigation/NavigationMenuPage.vue';
//import NavigationView from '@/views/lecture/layoutForm/navigation/NavigationView.vue';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    NavigationMenuPage,
    Footer
  },
};
</script>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.dropbtn {
  background-color: white;
  padding: 16px;
  font-size: 16px;
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
  min-width: 60px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-content a {
  padding: 8px 16px;
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