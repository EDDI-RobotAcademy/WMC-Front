<template>
  <v-container>
    <div align="center">
      <h2>NOTICE</h2>
      <notice-read v-if="notice" :notice="notice" :images="notice.images"/>
      <p v-else>로딩중 .......... </p>
      <router-link :to="{ name: 'NoticeModifyPage', params: { noticeId, notice }}">수정</router-link>
      <button @click="onDelete">삭제</button>
      <router-link :to="{ name: 'NoticeListPage' }">
        돌아가기
      </router-link>
    </div>
  </v-container>
</template>

<script>
import NoticeRead from '../../../components/csCenter/notice/NoticeRead.vue'
import { mapActions, mapState } from 'vuex'

const noticeModule = 'noticeModule'

export default {
  components: { NoticeRead },
    name: "NoticeReadPage",
    props: {
    noticeId: {
      type: String,
      required: true,
    },
  },
    computed: {
        ...mapState(noticeModule, ['notice']),
    },
    methods: {
        ...mapActions(noticeModule, [
            'requestNoticeToSpring',
            'requestDeleteNoticeToSpring',
        ]),
        onDelete () {
      if (confirm('공지사항을 삭제하시겠습니까?')) {
      this.requestDeleteNoticeToSpring(this.noticeId)
        .then(() => {
          this.$router.push({ name: 'NoticeListPage' });
        })
        .catch(() => {
          alert('문제 발생!');
        });
    }
  },
    },
    created() {
      this.requestNoticeToSpring(this.noticeId);
    }
}
</script>

<style>
</style>