<template>
  <div>
    <login-form @submit="onSubmit"></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/account/SignInForm.vue'
import Vue from 'vue'
import cookies from 'vue-cookies'
import mainRequest from "@/api/mainRequest";


Vue.use(cookies)

export default {
  name: 'SignInPage',
  components: {
    LoginForm
  },
  data () {
    return {
      isLogin: false
    }
  },
  mounted () {
    if (this.$store.state.isAuthenticated != false) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    onSubmit (payload) {
      if (!this.isLogin) {
        const { email, password } = payload
        mainRequest
          .post('/member/sign-in', { email, password })
          .then((res) => {
            if (res.data) {
              alert('로그인 성공!')
              this.$store.state.isAuthenticated = true
              this.$cookies.set('user', res.data, 3600)
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              this.isLogin = true
              const token = JSON.parse(localStorage.getItem('userInfo'))
              mainRequest
                .post('/cart/validate', token)
                .then((res) => {
                  if (res.data) {
                    console.log('인증된 사용자 입니다.')
                    const [memberId, authorityName] = res.data.split(':')
                    if(authorityName === 'MANAGER') {
                      this.$store.state.isManager = true
                    }
                    localStorage.setItem('memberId', memberId)
                    localStorage.setItem('authorityName', authorityName)
                    const user = localStorage.getItem('memberId')
                  }
                })
              this.$router.push('/')
            } else {
              alert('아이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.')
            }
          })
          .catch((res) => {
            alert(res.response.data.message)
          })
      } else {
        alert('이미 로그인이 되어 있습니다!')
      }
    }
  }
}
</script>

<style scoped></style>
