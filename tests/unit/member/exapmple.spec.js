

import Vuetify from 'vuetify'


jest.mock('@/store/member/MemberModule')


const vuetify = new Vuetify()

describe('MyPageForm', () => {
    it('renders props.msg when passed', () =>{
        let member = new Array() 
        member.id = 1
        member.email = "12345@naver.com"
    })
})