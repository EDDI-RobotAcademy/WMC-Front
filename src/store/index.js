import Vue from 'vue'
import Vuex from 'vuex'

import state from '@/store/states'


import noticeModule from './notice/NoticeModule'
import productModule from './product/ProductModule'


Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    noticeModule: noticeModule,
    productModule: productModule,

  },
  state
})


export default store
