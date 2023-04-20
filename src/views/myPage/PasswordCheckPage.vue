<template>
    <my-page-password-check-form @submit="onSubmit"/>
</template>

<script>
import MyPagePasswordCheckForm from "@/components/myPage/MyPagePasswordCheckForm";
import router from '@/router';
import { mapActions } from 'vuex';
const memberModule = 'memberModule'
export default {
  name: 'PasswordCheckPage',
  components: {
    MyPagePasswordCheckForm
  },
  methods: {
    ...mapActions(memberModule, ['reqMyPageCheckPasswordToSpring']),
    onSubmit(password) {
      console.log("비밀번호 체크: "+ password)
      
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let memberId = userInfo.memberId;
      
      (async () => {
        let checkPassword = await this.reqMyPageCheckPasswordToSpring({ memberId, password })
        console.log("체크 페이지에서 보는 "+ checkPassword);
  
        if(checkPassword) {
          router.push('/my-page-view');
        }
      })
      
    },
  },
};
</script>

<style scoped>
</style>