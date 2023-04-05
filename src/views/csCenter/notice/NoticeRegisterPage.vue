<template>
    <v-container>
        <h2>공지사항 작성</h2>
        <notice-register-form @submit="onSubmit" />
    </v-container>
</template>

<script>

import NoticeRegisterForm from '../../../components/csCenter/notice/NoticeRegisterForm.vue'
import { mapActions } from 'vuex'

const noticeModule = 'noticeModule'

export default {
  components: { NoticeRegisterForm },
  name: 'NoticeListPage',
  methods: {
    ...mapActions(noticeModule, [
      'requestCreateNoticeToSpring'
    ]),
    async onSubmit (payload) {
      await this.requestCreateNoticeToSpring(payload)
      await this.$router.push({
        name: 'NoticeListPage'
      })
    }
  }
}
</script>

<style></style>
