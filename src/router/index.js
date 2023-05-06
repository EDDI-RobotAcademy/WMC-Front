import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '@/views/account/SignUpView.vue';
import SignInView from '@/views/account/SignInView.vue';
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue';
import ProductListPage from '@/views/product/ProductListPage.vue';

import MainProductListPage from '@/views/product/MainProductListPage.vue';
import NoticeListPage from '@/views/csCenter/notice/NoticeListPage.vue';
import NoticeRegisterPage from '@/views/csCenter/notice/NoticeRegisterPage.vue';
import NoticeReadPage from '@/views/csCenter/notice/NoticeReadPage.vue';
import NoticeModifyPage from '@/views/csCenter/notice/NoticeModifyPage.vue';
import MyPageView from '@/views/myPage/MyPageView.vue';
import QuestionBoardListPage from '@/views/questionBoard/QuestionBoardListPage.vue';
import CartView from '@/views/order/CartView';
import QuestionBoardRegisterPage from '@/views/questionBoard/QuestionBoardRegisterPage.vue';
import ProductDetailPage from '@/views/product/ProductDetailPage.vue';
import ManagerPageView from '@/views/managerPage/ManagerPageView.vue';
import MostSoldProductPage from '@/views/product/MostSoldProductPage.vue';
import SalesGraph from '@/views/managerPage/SalesGraph.vue';
import ProductsSearchView from '@/views/product/ProductsSearchView.vue';
import MapStoreView from '@/views/storeMap/MapStoreView.vue';
import ReviewPage from '@/views/review/ReviewPage.vue';
import QuestionBoardReadPage from '@/views/questionBoard/QuestionBoardReadPage.vue'



function checkManagerAuthority(to, from, next) {
  const isManager = localStorage.getItem('authorityName') === 'MANAGER';

  if (isManager) {
    next();
  } else {
    alert('이 페이지에 액세스할 수 있는 권한이 없습니다.');
    next('/');
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView,
  },
  {
    path: '/sign-in',
    name: 'SignInView',
    component: SignInView,
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
  },
  {
    path: '/product-register-page',
    name: 'ProductRegisterPage',
    component: ProductRegisterPage,
  },
  {
    path: '/product-list-page',
    name: 'ProductListPage',
    component: ProductListPage,
  },

  {
    path: '/main-product-list-page',
    name: 'MainProductListPage',
    component: MainProductListPage,
  },
  {
    path: '/notice-list',
    name: 'NoticeListPage',
    component: NoticeListPage,
  },
  {
    path: '/notice-register',
    name: 'NoticeRegisterPage',
    component: NoticeRegisterPage,
    beforeEnter: checkManagerAuthority,
  },
  {
    path: '/notice-read/:noticeId',
    name: 'NoticeReadPage',
    components: {
      default: NoticeReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: '/notice-modify/:noticeId',
    name: 'NoticeModifyPage',
    component: NoticeModifyPage,
  },
  {
    path: '/question-board',
    name: 'QuestionBoardListPage',
    component: QuestionBoardListPage,
  },
  {
    path: '/question-register',
    name: 'QuestionBoardRegisterPage',
    component: QuestionBoardRegisterPage,
  },
  {
    path: '/question/:questionBoardId',
    name: 'QuestionBoardReadPage',
    components: { 
      default: QuestionBoardReadPage
    },
    props: {
      default: true
    }
  },

  {
    path: '/product/detail/:productId',
    name: 'ProductDetailPage',
    component: ProductDetailPage,
  },
  {
    path: '/question/:questionBoardId',
    name: 'QuestionBoardReadPage',
    components: { 
      default: QuestionBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/product/listByCategory/:categoryId',
    name: 'ProductListByCategoryPage',
    component: () => import('@/views/product/ProductListByCategoryPage.vue'),
    props: true,
  },
  {
    path: '/my-page-view',
    name: 'MyPageView',
    components: {
      default: MyPageView,
    },
  },
  {
    path: '/manager-page-view',
    name: 'ManagerPageView',
    component: ManagerPageView,
  },
  {
    path: '/most-sold-product',
    name: 'MostSoldProductPage',
    component: MostSoldProductPage,
  },
  {
    path: '/sales-graph',
    name: 'SalesGraph',
    component: SalesGraph,
  },
  {
    path: '/product-search',
    name: 'ProductsSearchView',
    component: ProductsSearchView,
    props: true,
  },
  {
    path: '/map-store-view',
    name: 'MapStoreView',
    components: {
      default: MapStoreView,
    },
  },
    {
      path: '/review',
      name: 'ReviewPage',
      component: ReviewPage,
    },

];


const router = new VueRouter({
  routes,
});

export default router;
