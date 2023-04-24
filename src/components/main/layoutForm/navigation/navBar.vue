<template>
  <nav>
    <v-app-bar
      flat
      color="rgba(255,255,255,0.5)"
      class="flex-grow-0 scrollable-nav"
      height="50"
      app
    >
      <router-link to="/">
        <v-img
          :src="require('@/assets/logo.png')"
          max-height="40"
          max-width="40"
          class="mx-10"
        />
      </router-link>
      <v-spacer class="btn-container">
        <div class="dropdown">
          <router-link
            :to="{
              name: 'ProductListByCategoryPage',
              params: { categoryId: 1 },
            }"
            tag="button"
            class="button"
            type="button"
            data-hover="선글라스"
          >
            <span>SUNGLASSES</span>
          </router-link>
        </div>

        <div class="dropdown">
          <router-link
            :to="{
              name: 'ProductListByCategoryPage',
              params: { categoryId: 2 },
            }"
            tag="button"
            class="button"
            type="button"
            data-hover="안경"
          >
            <span>EYEGLASSES</span>
          </router-link>
        </div>

        <div class="dropdown">
          <router-link
            :to="{
              name: 'ProductListByCategoryPage',
              params: { categoryId: 3 },
            }"
            tag="button"
            class="button"
            type="button"
            data-hover="악세서리"
          >
            <span>&nbsp;ACC&nbsp;</span>
          </router-link>
        </div>

        <div class="dropdown">
          <button
            class="button"
            type="button"
            data-hover="리뷰"
            onclick="location.href='/product-list-page'"
          >
            <span>REVIEW</span>
          </button>
        </div>

        <div class="dropdown">
          <button
            class="button"
            type="button"
            data-hover="스토어"
            onclick="location.href='/product-list-page'"
          >
            <span>STORE</span>
          </button>
        </div>

        <div class="dropdown">
          <button
            class="button"
            type="button"
            data-hover="브랜드"
            onclick="location.href='/product-list-page'"
          >
            <span>BRAND</span>
          </button>
        </div>
        <div class="dropdown">
          <button
            class="button"
            type="button"
            data-hover="아카이브"
            onclick="location.href='/product-list-page'"
          >
            <span>ARCHIVE</span>
          </button>
        </div>
      </v-spacer>

      <div class="right-box">
        <div class="dropdown">
          <button
            class="button"
            type="button"
            data-hover="고객센터"
            onclick="location.href='/notice-list'"
          >
            <span>CS CENTER</span>
          </button>
        </div>
        <div class="nav-util">
          <div v-if="showSearch">
            <v-text-field
              v-model="keyword"
              ref="keyword"
              label="검색어를 입력해주세요"
              type="text"
              color="gray"
              append-icon="mdi-magnify"
              @click:append="search"
            />
          </div>
          <div v-else>
            <v-btn large elevation="0" text @click="btnSearch">
              <v-icon> mdi-magnify</v-icon>
            </v-btn>
          </div>
          <button
            class="right-btn"
            large
            elevation="0"
            text
            @click="goCartPage"
          >
            <v-icon> mdi-cart-outline</v-icon>
          </button>
        </div>

        <button
          v-if="isAuthenticated == false"
          text
          color="black"
          onclick="location.href='/sign-in'"
        >
          <span>로그인</span>
        </button>
        <div class="nav-account">
          <button
            class="right-btn"
            v-if="isAuthenticated == true"
            text
            color="black"
            v-on:click="logout"
            onclick="location.href='/'"
          >
            <span>로그아웃</span>
          </button>

          <button
            class="right-btn"
            v-if="isAuthenticated == false"
            text
            color="black"
            onclick="location.href='/sign-up'"
          >
            <span>회원가입</span>
          </button>
          <button
            class="right-btn"
            v-if="isAuthenticated && !isManager"
            text
            color="grey"
            onclick="location.href='/my-page-view'"
          >
            <span>마이페이지</span>
          </button>
          <button
            class="right-btn"
            v-if="isAuthenticated && isManager"
            text
            color="grey"
            onclick="location.href='/manager-page-view'"
          >
            <span>관리자 페이지</span>
          </button>
        </div>
      </div>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import mainRequest from '@/api/mainRequest';

const productModule = 'productModule';

export default {
  name: 'NavigationMenuPage',
  data() {
    return {
      showSearch: false,
      keyword: '',
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
    ...mapState(['isAuthenticated', 'isManager']),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    if (localStorage.getItem('userInfo')) {
      this.$store.state.isAuthenticated = true;
    } else {
      this.$store.state.isAuthenticated = false;
    }
    if (
      localStorage.getItem('userInfo') &&
      localStorage.getItem('authorityName').includes('MANAGER')
    ) {
      this.$store.state.isManager = true;
    } else {
      this.$store.state.isManager = false;
    }
  },
  methods: {
    ...mapActions(productModule, ['requestProductsToSpring']),
    async fetchProductsByCategory(categoryId) {
      try {
        this.$router.push({
          name: 'ProductListByCategoryPage',
          params: { categoryId },
        });
      } catch (error) {
        console.error(error);
      }
    },

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
      mainRequest.post('/member/logout', token).then(() => {
        alert('로그아웃 완료');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('memberId');
        localStorage.removeItem('authorityName');
        this.$store.state.isAuthenticated = false;
        this.$store.state.isManager = false;
      });
    },
    resign() {
      let token = localStorage.getItem('userInfo');
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
      console.log('token: ' + token);
      mainRequest.post('/member/resign', token).then(() => {
        alert('회원탈퇴 완료');
        localStorage.removeItem('userInfo');
        this.$store.state.isAuthenticated = false;
      });
    },
    goCartPage() {
      if (this.$router.currentRoute.path !== '/cart') {
        this.$router.push({ name: 'CartView' });
        this.showSearch = false;
      }
    },
    btnSearch() {
      this.showSearch = true;
      this.$router.push('/product-search');
    },
    btnNoSearch() {
      this.showSearch = false;
    },
    async search() {
      const keyword = this.$refs.keyword.value;
      await this.requestProductsToSpring(keyword);
    },
  },
};
</script>

<style>
.btn-container {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
}

.dropdown {
  position: relative;
  display: center;
  padding-top: -20px;
}

.dropdown-content {
  color: inherit;
  display: none;
  position: absolute;
  min-width: 80px;
  padding: 10px;
  box-shadow: none;
  width: fit-content;
  background-color: rgba(255, 255, 255, 0);
}

.dropdown-content a {
  margin-top: 10px;
  text-decoration: none;
  display: block;
  min-width: inherit;
}

.dropdown:hover .dropdown-content {
  color: black;
  display: block;
  width: auto;
  align-content: center;
}

.dropdown:hover .dropdown-content a {
  padding: auto;
  text-align: center;
  display: block;
  color: black;
  font-size: 12px;
}

.dropdown:hover .dropbtn {
  min-width: auto;
  padding: auto;
  box-shadow: none;
  z-index: auto;
}

.right-box {
  padding: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  font-size: 14px;
}

.v-btn {
  padding: 12px;
  font-size: 12px;
  border-radius: 10%;
}

.right-box .nav-util {
  display: flex;
  align-items: center;
  margin-right: 45px;
}

.right-btn {
  padding-left: 20px;
  padding-right: 20px;
  text: fixed;
}

.hidden {
  display: none;
}

.button {
  display: inline-block;
  position: relative;
  margin: 1em;
  padding: 0.67em;
  overflow: hidden;
  text-decoration: none;
  font-size: 14px;
  outline: none;
  color: black;
  background: transparent;
  font-family: 'raleway', sans-serif;
}

.button span {
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  -webkit-transition-delay: 0.1s;
  -moz-transition-delay: 0.1s;
  -o-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.button:before,
.button:after {
  content: '';
  position: absolute;
  top: 0.67em;
  left: 0;
  width: 100%;
  text-align: center;
  opacity: 0;
  -webkit-transition: 0.2s, opacity 0.4s;
  -moz-transition: 0.2s, opacity 0.4s;
  -o-transition: 0.2s, opacity 0.4s;
  transition: 0.2s, opacity 0.4s;
}

/* :before */

.button:before {
  content: attr(data-hover);
  -webkit-transform: translate(0%, -100%);
  -moz-transform: translate(0%, -100%);
  -ms-transform: translate(0%, -100%);
  -o-transform: translate(0%, -100%);
  transform: translate(0%, -100%);
}

/* :after */

/* Span on :hover and :active */

.button:hover span,
.button:active span {
  opacity: 0;
  -webkit-transform: scale(0.3);
  -moz-transform: scale(0.3);
  -ms-transform: scale(0.3);
  -o-transform: scale(0.3);
  transform: scale(0.3);
}

/*  
  We show :before pseudo-element on :hover 
  and :after pseudo-element on :active 
*/

.button:hover:before,
.button:active:after {
  opacity: 1;
  -webkit-transform: translate(0, 0);
  -moz-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
  -webkit-transition-delay: 0.2s;
  -moz-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

/* 
We hide :before pseudo-element on :active
*/
.scrollable-nav {
  overflow-x: auto;
  white-space: nowrap;
}

.scrollable-nav::-webkit-scrollbar {
  display: none;
}

.scrollable-nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@media screen and (max-width: 768px) {
  .scrollable-nav {
    overflow-x: auto;
    white-space: nowrap;
  }

  .scrollable-nav::-webkit-scrollbar {
    display: none;
  }

  .scrollable-nav {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
