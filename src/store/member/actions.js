
import {
  REQUEST_MY_PAGE_MEMBER_INFO
} from './mutation-types';

import axiosInst from '@/utility/axiosObject';

export default {
   requestMemberInfo({commit}) {
      let token = localStorage.getItem('userInfo');
      
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
        axiosInst.post(`/member/account/`, token)
            .then((res) => {
                commit(REQUEST_MY_PAGE_MEMBER_INFO, res.data);
                console.log("asdf");
                console.log(res.data);
                console.log(res.data.email);
                console.log(res.data.username);
                console.log(res.data.birthdate);
                console.log(res.data.phoneNumber);
                console.log(res.data.city);
                console.log(res.data.street);
                console.log(res.data.addressDetail);
                console.log(res.data.zipcode);
            })
            .catch((res) => {
                console.log(res.data);
                alert('문제 발생!')
            })
  
      },
  };
