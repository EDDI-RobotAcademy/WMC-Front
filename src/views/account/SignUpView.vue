<template>
    <v-container>
      <sign-up-form @submit="onSubmit"/>
    </v-container>
  </template>

<script>

import SignUpForm from '@/components/account/SignUpForm.vue'
import mainRequest from "@/api/mainRequest";


export default {
  name: 'SignUpPage',
  components: {
    SignUpForm
  },
  methods: {
    onSubmit (payload) {
      const { email, password, username, birthdate, authorityName, managerCheck, managerCode, city, street, addressDetail, zipcode, phoneNumber } = payload

      mainRequest.post('/member/sign-up', {
        email, password, username, birthdate, authorityName, managerCheck, managerCode, city, street, addressDetail, zipcode, phoneNumber
      })
        .then((res) => {
          alert('회원 가입 완료!' + res)
          this.$router.push('/sign-in')
        })
        .catch((res) => {
          alert(res.response.data.message)
        })
    }
  }
}
</script>

  <style scoped>

  </style>
