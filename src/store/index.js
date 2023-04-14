import Vue from 'vue'
import Vuex from 'vuex'

import state from '@/store/states'


import noticeModule from './notice/NoticeModule'
import productModule from './product/ProductModule'
import questionModule from './question/QuestionModule'
import memberModule from './member/MemberModule'


Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    noticeModule: noticeModule,
    productModule: productModule,
    questionModule: questionModule,
    memberModule: memberModule,

  },
  state
})


export default store
