import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/account/SignUpView.vue'
import SignInView from '@/views/account/SignInView.vue'
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'
import ProductListPage from '@/views/product/ProductListPage.vue'
import ProductItemListPage from '@/views/product/productItem/ProductItemListPage.vue'
import MainProductListPage from '@/views/product/MainProductListPage.vue'
import NoticeListPage from '@/views/csCenter/notice/NoticeListPage.vue'
import NoticeRegisterPage from '@/views/csCenter/notice/NoticeRegisterPage.vue'
import NoticeReadPage from '@/views/csCenter/notice/NoticeListPage.vue'
import MyPageView from '@/views/myPage/MyPageView.vue'
import CartView from '@/views/order/CartView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/sign-in',
    name: 'SignInView',
    component: SignInView
  },
  {
    path: '/my-page',
    name: 'MyPageView',
    component: MyPageView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView
  },
  {
    path: '/product-register-page',
    name: 'ProductRegisterPage',
    component: ProductRegisterPage
  },
  {
    path: '/product-list-page',
    name: 'ProductListPage',
    component: ProductListPage
  },
  {
    path: '/product-item-list-page',
    name: 'ProductItemListPage',
    component: ProductItemListPage
  },
  {
    path: '/main-product-list-page',
    name: 'MainProductListPage',
    component: MainProductListPage
  },
  {
    path: '/notice-list',
    name: 'NoticeListPage',
    component: NoticeListPage
  },
  {
    path: '/notice-register',
    name: 'NoticeRegisterPage',
    component: NoticeRegisterPage
  },
  {
    path: '/notice-read',
    name: 'NoticeReadPage',
    component: {
      default: NoticeReadPage
    },
    props: {
      default: true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
