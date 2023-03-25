<template>

  <nav :class="{'hidden': isNavHidden}">
    <v-app-bar color="white"  class="flex-grow-0" height="60" app>
      <!--v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" /-->
      <router-link to="/">
        <v-img
          :src="require('@/assets/logo.png')"
          max-height="40"
          max-width="40"
          class="mx2"
        />
      </router-link>

      <v-toolbar-title class="text-uppercase text--darken-4">
        <span></span>
      </v-toolbar-title>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <v-spacer class="btn-container" >
        <div class="dropdown">
          <button class="dropbtn">BEST
          </button>
          <div class="dropdown-content">
            <a href='http://localhost:8080/'>1월</a>
            <a href=''>2월</a>
            <a href=''>3월</a>
            <a href=''>4월</a>
            <a href=''>5월</a>
           </div>
        </div>
        
        <div class="dropdown">
          <button class="dropbtn">NEW 10%
          </button>
          <div class="dropdown-content">
            <a href='http://localhost:8080/sign-in-test#/sign-in'>1월</a>
            <a href=''>2월</a>
            <a href=''>3월</a>
            <a href=''>4월</a>
            <a href=''>5월</a>
           </div>
        </div>
        |
        <div class="dropdown">
          <button class="dropbtn">SHOE
          </button>
          <div class="dropdown-content">
            <a href='http://localhost:8080/sign-in-test#/sign-in' color="black">HEEL</a>
            <a href=''>FLAT</a>
            <a href=''>LOAFER</a>
            <a href=''>SNEAKERS/SLIPON</a>
            <a href=''>ANKLE/BOOTS</a>
            <a href=''>SLIPPER</a>
            <a href=''>SANDAL</a>
            <a href=''>ACC</a>
           </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">BEST
          </button>
          <div class="dropdown-content">
            <a href='http://localhost:8080/sign-in-test#/sign-in'>1월</a>
            <a href=''>2월</a>
            <a href=''>3월</a>
            <a href=''>4월</a>
            <a href=''>5월</a>
           </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">SALE
          </button>
          <div class="dropdown-content">
            <a href='http://localhost:8080/#/product-list-page'>전체상품</a>
            <a href=''>2월</a>
            <a href=''>3월</a>
            <a href=''>4월</a>
            <a href=''>5월</a>
           </div>
          </div>
        
      </v-spacer>

      <div class="right-box">
        <div class="nav-util">
          <v-icon> mdi-magnify</v-icon>
          <v-btn large elevation="0" text @click="goCartPage">
            <v-icon> mdi-cart-outline</v-icon>
          </v-btn>
        </div>
        <v-btn
          v-if="isAuthenticated == false"
          text
          color="black"
          onclick="location.href='http://localhost:8080/sign-in-test#/sign-in'"
        >
          <span>로그인</span>
        </v-btn>
        <div class="nav-account">
          <v-btn
            v-if="isAuthenticated == true"
            text
            color="black"
            v-on:click="logout"
            onclick="location.href='http://localhost:8080/#/'"
          >
            <span>로그아웃</span>
          </v-btn>
          <v-btn
            v-if="isAuthenticated == false"
            text
            color="black"
            onclick="location.href='http://localhost:8080/sign-up-test#/sign-up'"
          >
            <span>회원가입</span>
          </v-btn>
          <v-btn
            v-if="isAuthenticated == true"
            text
            color="grey"
            onclick="location.href='http://localhost:8080/my-page#/'"
          >
            <span>마이페이지</span>
          </v-btn>
        </div>
      </div>

      <!-- <v-btn v-if="isAuthenticated == false" text color="grey" v-on:click="resign">
          <span>회원 탈퇴</span>
        </v-btn> -->
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  name: 'NavigationMenuPage',
  data() {
    return {
      isTrue: false,
      navigation_drawer: false,
      isNavHidden: false,
      links: [
        { icon: 'mdi-home', text: 'Home', name: 'home', route: '/' },
        {
          icon: 'mdi-share-variant-outline',
          text: 'Sharing',
          name: 'JpaBoardListPage',
          route: '/board-list-page',
        },
      ],
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },
  
  
    name: 'App',
    components: {},
    
  computed: {
    ...mapState(['isAuthenticated']),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    if (localStorage.getItem('userInfo')) {
      this.$store.state.isAuthenticated = true;
    } else {
      this.$store.state.isAuthenticated = false;
    }
  },
  methods: {
    handleScroll() {
      this.isNavHidden = window.pageYOffset > 0;
    },
    clickToggle() {
      this.isTrue = !this.isTrue;
    },
    logout() {
      console.log('getItem: ' + localStorage.getItem('userInfo'));
      let token = localStorage.getItem('userInfo');
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
      console.log('token: ' + token + ', length: ' + token.length);
      axios.post('http://localhost:7777/member/logout', token).then(() => {
        alert('로그아웃 완료');
        localStorage.removeItem('userInfo');
        this.$store.state.isAuthenticated = false;
      });
    },
    resign() {
      let token = localStorage.getItem('userInfo');
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
      console.log('token: ' + token);
      axios.post('http://localhost:7777/member/resign', token).then(() => {
        alert('회원탈퇴 완료');
        localStorage.removeItem('userInfo');
        this.$store.state.isAuthenticated = false;
      });
    },
    goCartPage() {
      this.$router.push({ name: 'CartView' });
      this.showSearch = false;
    },
  },
}

</script>

<style>
.btn-container {
  padding:auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
}


.dropbtn {
  padding: 12px;
  font-size: 10px;
  border-radius: 10%;
  
}
.btn-container .dropbtn :hover {
  border-color: #fff;
  background-color:#fff;
}

.dropdown {
  position: relative;
  display: inline-block;
 
}


.dropdown-content {
  color: inherit;
  display: none;
  position: absolute;
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


.dropdown:hover .dropdown-content a{

  padding: auto;
  text-align: center;
  display: block;
  color:black;
  font-size: 10px;
}

.dropdown:hover .dropbtn {
  min-width: auto;
  padding: auto;
  box-shadow: none;
  z-index: auto;
  
  
}



.right-box {
  padding:auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
}

.v-btn {

  padding: 12px;
  font-size: 10px;
  border-radius: 10%;
  
}


.right-box .nav-util {
  display: flex;
  align-items: center;
  margin-right: 45px;
  padding: auto;
}

.hidden {
  display: none;
}




</style>
