<template>
  <v-container>
    <div>
      <cs-center-contents/>
    </div>

    <div>
      <div class="mt-15 notice_list">
            <div class="d-flex justify-space-between">
              <h2>NOTICE</h2>
              <div class="mt-10 mb-10" v-if="isManager">
                <router-link :to="{ name: 'NoticeRegisterPage' }" style="color: black;">
                  공지사항 작성
                </router-link>
              </div>
            </div>
            <notice-list :notices="notices"/>
          </div>
    </div>
  </v-container>
</template>

<script>
import NoticeList from '@/components/csCenter/notice/NoticeList.vue'
import { mapActions, mapState } from 'vuex'

import CsCenterContents from '@/components/csCenter/CsCenterContents.vue'

const noticeModule = 'noticeModule'

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
    ...mapActions(noticeModule,[
      'requestNoticeListToSpring'
    ])
  }
}

</script>

<style scoped>

</style>