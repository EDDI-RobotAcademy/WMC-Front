<template>
  <v-container>
      <h2>공지사항 작성</h2>
      <notice-register-form ref="noticeRegisterForm" @submit="onSubmit" />
      <button @click="submitForm" class="mr-5 notice-button">등록</button>
      <router-link :to="{ name: 'NoticeListPage' }" class="notice-button">
        취소
      </router-link>
  </v-container>
</template>

<script>

import NoticeRegisterForm from '../../../components/csCenter/notice/NoticeRegisterForm.vue'
import { mapActions } from 'vuex'

const noticeModule = "noticeModule";

export default {
components: { NoticeRegisterForm },
name: 'NoticeListPage',
methods: {
  ...mapActions([`${noticeModule}/requestCreateNoticeToSpring`]),
  async onSubmit(payload) {
    await this[`${noticeModule}/requestCreateNoticeToSpring`](payload)
    await this.$router.push({
      name: 'NoticeListPage'
    })
  },
  submitForm() {
    this.$refs.noticeRegisterForm.onSubmit();
  }
}
};


</script>

<style></style>
