
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'


import NoticeList from '@/components/csCenter/notice/NoticeList'


import Vuetify from 'vuetify'

jest.mock('@/store/notice/NoticeModule')



const vuetify = new Vuetify()

describe('NoticeList', () => {
  it('renders props.msg when passed', () => {
    let notice = new Array()
    notice.id = 1
    notice.title = "go"
    notice.writer = "go"
    notice.regDate = new Date()

    const wrapper = shallowMount(NoticeList, {
      propsData: { notices: notice }
    })
    expect(wrapper.props().notices).toBe(notice)
  })
})


