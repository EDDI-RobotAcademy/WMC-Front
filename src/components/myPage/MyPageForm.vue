<template>
  <div>
    <div class="container">
      
          <v-card tile flat class="mypage-card">
            <h3>회원 정보</h3>
            <!--편집버튼 구현하기(우측끝)-->  
            <v-divider class="mb-8" style="border-width: 1px; border-color: black"></v-divider>
            <v-row>
              <v-col class="text-h5">
                <v-text-field v-model="member.email" label="아이디" class="v-text-fields" readonly ref="id" 
                   color="black" prepend-icon="mdi-account-outline"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex">
                  <v-text-field v-model="member.username" label="이름" class="v-text-fields" readonly ref="name"
                   color="black" prepend-icon="mdi-account-outline"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex">
                  <v-text-field v-model="member.birthdate" label="생년월일" class="v-text-fields" readonly ref="name"
                   color="black" prepend-icon="mdi-account-outline"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex">
                  <v-text-field v-model="member.password" label="비밀번호" class="v-text-fields" readonly ref="name"
                   color="black" prepend-icon="mdi-account-outline"/>
                   
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex">
                  <v-text-field v-model="member.street" label="주소" class="v-text-fields" readonly ref="name"
                   color="black" prepend-icon="mdi-account-outline"/>
                </div>
              </v-col>
            </v-row>
          </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const memberModule = 'memberModule';

export default {
  name: 'MyPageForm',
  computed: {
    ...mapState(memberModule, ["member"]),
    isAuthenticated() {
      return this.$store.state.memberModule.isAuthenticated;
    },
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
}
.mypage-card{
  
  width:50%;
}

</style>
