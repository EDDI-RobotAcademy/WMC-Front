
import {
  REQUEST_MY_PAGE_MEMBER_INFO,
  REQUEST_MANAGER_CHECK
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
      async fetchUsername() {
        const memberId = localStorage.getItem("id");
        if (memberId) {
          try {
            const response = await axiosInst.get(`/member/username/${memberId}`);
            this.username = response.data.username;
            console.log("해당 memberId로 username을 가져오는 데 성공했습니다");
          } catch (error) {
            console.error("문제가 발생했습니다:", error);
          }
        }
      },
   
      async passwordCheck({},payload ) {
        const {memberId, password} = payload;
        return mainRequest.post(`/member/passwordCheck`, {
            memberId,password
          })
          .then ((res)=> {
            if(res.data) {
              alert("이전 비밀번호가 일치합니다");
              return true;
            } else {
              alert("이전 비밀번호가 불일치합니다 " + (res.data));
              return false;
            } 
          }) 
      
    },

    async updatePassword({}, { memberId, newPassword }) {
    try {
      console.log(memberId, newPassword )

      return mainRequest.put(`/member/passwordUpdate`, {
        newPassword,
        memberId
      })
      .then ((res)=> {
        if(res.data) {
          return true;
        } else {
          return false;
        } 
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  managerCheck({ commit }) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('userInfo');
      const length = token.length;
      console.log('token: ' + token + ', length: ' + length);
      token = token.substr(1, length - 2);
      mainRequest.post(`/member/ismanager/`, token)
        .then((res) => {
          commit(REQUEST_MANAGER_CHECK, res.data);
          console.log(res.data);
          console.log("managercheck입니다");
          resolve(res.data); // Resolve with the boolean value
        })
        .catch((error) => {
          console.log(error);
          alert('문제 발생!');
          reject(error); // Reject with the error
        });
    });
  },

async updateAddress({}, payload) {
  try {

    console.log(payload)

    return mainRequest.put('/member/addressUpdate',payload)
    .then ((res)=> {
      if(res.data) {
        alert('주소 수정에 성공하였습니다.');
        return true;
      } else {
        alert('주소 수정에 실패하였습니다.');
        return false;
      }
    });
  }catch (error) {
    console.error(error);
    return false;
  }
},

async reqResign({}, token) {
  try {
    console.log("액션코드 : " + JSON.stringify(token));
    let json = { token};
    const response = await mainRequest.delete('/member/delete', { data: json });
    if (response.data) {
      alert("회원탈퇴 완료");
      localStorage.removeItem("memberId");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authorityName");
      
    } else {
      alert('탈퇴에 실패하였습니다.');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

};