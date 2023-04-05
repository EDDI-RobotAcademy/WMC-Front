import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import { shallowMount } from '@vue/test-utils'

import NoticeRegisterPage from '@/views/csCenter/notice/NoticeRegisterPage'
import router from "@/router";

const vuetify = new Vuetify()
const wrapper = shallowMount(NoticeRegisterPage, {
  router,
  vuetify
})

describe('NoticeRegisterPage.vue:', () => {
  it('1. Mounts properly', () => {
    expect(wrapper.vm).toBeTruthy();
  })
})
