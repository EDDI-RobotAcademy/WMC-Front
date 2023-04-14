<template>
  <v-container>
    <div align="center">
      <h2>공지사항 수정</h2>
      <notice-modify v-if="notice" :notice="notice" @submit="onSubmit" />
      <p v-else>로딩중 .......... </p>
      <router-link :to="{ name: 'NoticeReadPage', params: { noticeId, notice }}">돌아가기</router-link>
    </div>
  </v-container>
</template>

<script>
import NoticeModify from "../../../components/csCenter/notice/NoticeModify.vue";

import { mapActions, mapState } from "vuex";

const noticeModule = "noticeModule";

export default {
    components: { NoticeModify },
    name: "NoticeModifyPage",
    props: {
        noticeId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(noticeModule, ['notice'])
    },
    methods: {
        ...mapActions(noticeModule, [
            'requestNoticeToSpring',
            'requestModifyNoticeToSpring',
        ]),
        async onSubmit (payload) {
            const { title, content, writer, files } = payload
            const noticeId = this.noticeId
            await this.requestModifyNoticeToSpring({ noticeId, title, content, writer, files })
            await this.$router.push({
                name: 'NoticeReadPage',
                params: { noticeId: this.noticeId }
            })
        }
    },
    created () {
        this.requestNoticeToSpring(this.noticeId)
    }
}
</script>

<style>
</style>