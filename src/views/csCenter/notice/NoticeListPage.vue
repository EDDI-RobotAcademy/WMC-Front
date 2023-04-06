<template>
  <v-container>
    <div>
      <div class="container">
        <div class="mr-10 left">
          <h2 style="font-size: 36px; font-weight: bold; letter-spacing: 1px;">CS SENTER</h2>
          <br>
          <div class="elevation-0">
            <v-card tile class="side_menu" max-width="300">
              <v-list>
                <router-link to="/notice-list" style="color: black;">공지사항</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">자주 묻는 질문</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">상품 문의</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">입금/결제 문의</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">배송 전 변경&취소</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">배송 문의</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">배송 후 교환/반품 문의</router-link>
              </v-list>
              <v-list>
                <router-link to="#" style="color: black;">A/S 문의</router-link>
              </v-list>
            </v-card>
          </div>
        </div>
        <div>
          <div class="elevation-0 right" style="background-color: white;">
            <div class="body_left">
              <h2 class="mt-10 ml-15 text-md-center">안녕하세요! WMC 고객센터입니다.</h2>
              <br>
              <p class="text-md-center">1234-5678</p>
            </div>
            <div class="body_right">
              <br>
              <div>
                <v-btn variant="outlined" class="mt-5 ml-15">Button</v-btn>
              </div>
              <br>
              <div>
                <v-btn variant="outlined" class="mt-5 ml-15">Button</v-btn>
              </div>
            </div>
          </div>
          <div class="mt-15 notice_list">
            <div class="d-flex justify-space-between">
              <h2>NOTICE</h2>
              <div class="mt-10 mb-10">
                <router-link :to="{ name: 'NoticeRegisterPage' }" style="color: black;">
                  공지사항 작성
                </router-link>
              </div>
            </div>
            <notice-list :notices="notices"/>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import NoticeList from '@/components/csCenter/notice/NoticeList.vue'
import { mapActions, mapState } from 'vuex'

const noticeModule = 'noticeModule'

export default {
  components: { NoticeList },
  name: "NoticeListPage",
  computed: {
    ...mapState(noticeModule, ['notices']), 
    noticeItemList() {
      return state.notices = passingData.map(Response => ({
          ...notice,
          ImageDataList: Response.ImageDataList
      }))
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
.container {
  display: flex;
  justify-content: center;
}
.right {
  display: flex;
  width: 800px;
  height: 200px;
  border:2px;
}
.notice_list {
  width: 800px;
}
.d-flex {
  display: flex;
}
.justify-space-between {
  justify-content: space-between;
}
</style>
