<template>
  <v-container>
    <div>
      <cs-center-contents />
    </div>

    <div>
      <div class="mt-10 notice_list">
        <div class="d-flex justify-space-between">
          <h2 class="ml-5">NOTICE</h2>
          <div class="mt-10 mb-10" v-if="isManager">
            <div>
              <v-btn @click="handleManagerCheck" plain style="font-size: 20px; font-weight: bold;">
                공지사항 작성
              </v-btn>
            </div>
          </div>
        </div>
        <notice-list :notices="notices" />
      </div>
    </div>
  </v-container>
</template>

<script>
import NoticeList from '@/components/csCenter/notice/NoticeList.vue'
import { mapActions, mapState } from 'vuex'

import CsCenterContents from '@/components/csCenter/CsCenterContents.vue'

const noticeModule = 'noticeModule'
const memberModule = 'memberModule'

export default {
  components: { NoticeList, CsCenterContents },
  name: "NoticeListPage",
  computed: {
    isManager() {
      return localStorage.getItem('authorityName') === 'MANAGER';
    },
    ...mapState(noticeModule, ['notices']),
    noticeItemList() {
      return state.notices
    }
  },

  mounted() {
    this.requestNoticeListToSpring()
  },
  methods: {
    ...mapActions(noticeModule, [
      'requestNoticeListToSpring']
    ),
    ...mapActions(memberModule, ['managerCheck']),
    async handleManagerCheck() {
      const isManager = await this.managerCheck();
      if (isManager) {
        this.$router.push({ name: 'NoticeRegisterPage' });
      } else {
        alert('공지사항을 만들 수 있는 권한이 없습니다.');
      }
    },
  }
}

</script>

<style scoped></style>