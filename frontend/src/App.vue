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
  background-color: #EFEBE9;
}

.dropbtn {
  background-color: #D7CCC8;
  padding: 12px;
  font-size: 10px;
  border-radius: 10%;
}

.dropdown {
  position: relative;
  display: inline-block;
 
}

.dropdown-content {
  color: black;
  display: none;
  position: absolute;
  background-color: #D7CCC8;
  min-width: 50px;
  padding: 10px;
  box-shadow: none;
  z-index: auto;
  
  
}

.dropdown-content a {
  margin-top: 10px;
  text-decoration: none;
  display: block;
  min-width:inherit;
  border-radius: 10%;
}

.dropdown-content a:hover {
  background-color: #fafafa;
  width: auto;
  align-content: center;
  
  border-radius: 10%;
}

.dropdown:hover .dropdown-content{
  color:black;
  display: block;
  width: auto;
  align-content: center;
  border-radius: 7%;
  
}
.dropdown:hover .dropdown-content a:hover{
  background-color: #FAFAFA;
  
}

.dropdown:hover .dropdown-content a{
  background-color: #D7CCC8;
  padding: auto;
  text-align: center;
  display: block;
  color:black;
  font-size: 10px;
}

.dropdown:hover .dropbtn {
  background-color: #FAFAFA;

  min-width: auto;
  padding: auto;
  box-shadow: none;
  z-index: auto;
  
}

</style>