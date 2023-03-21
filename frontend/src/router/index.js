import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/account/SignUpView.vue'
import SignInView from '@/views/account/SignInView.vue'
import CartView from '@/views/order/CartView.vue'

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
  // {
  //   path: '/my-page',
  //   name: 'MyPageView',
  //   component: MyPageView
  // },
  {
    path: "/cart",
    name: "CartView",
    component: CartView,
  },

]

const router = new VueRouter({
  routes
})

export default router
