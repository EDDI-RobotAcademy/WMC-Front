
import {
  REQUEST_MY_PAGE_MEMBER_INFO
} from './mutation-types';

import axiosInst from '@/utility/axiosObject';
import mainRequest from "@/api/mainRequest";


export default {
   requestMemberInfo({commit}) {
      let token = localStorage.getItem('userInfo');
      
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
        mainRequest.post(`/member/account/`, token)
            .then((res) => {
                commit(REQUEST_MY_PAGE_MEMBER_INFO, res.data);
            })
            .catch((res) => {
                console.log(res.data);
                alert('문제 발생!')
            })
  
      },
   
      async passwordCheck({},payload ) {
        const {memberId, password} = payload;
        await axiosInst.post(`/member/passwordCheck`, {
          memberId,password
      })
      .then ((res)=> {
        if(res.data) {
          alert("이전 비밀번호가 일치합니다");
            return true;
          } else {
            alert("이전 비밀번호가 불일치합니다");
            return false;
        }
      } ) 
    },

    async updatePassword({}, { memberId, newPassword }) {
    try {
      console.log(memberId, newPassword )

      const response = await axiosInst.put(`/member/passwordUpdate`, {
        newPassword,
        memberId
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};