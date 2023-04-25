<template>
  <div>
    <div class="container">
          <v-card tile flat class="mypage-card">
            <v-row>
              <v-col cols="12" class="text-h5">
                <h3>회원 정보</h3>
              </v-col>
               <v-row>
              <v-col>
                <v-btn color="primary" @click="showDialog = true">비밀번호 수정</v-btn>
              </v-col>
            </v-row>
            </v-row>
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
                  <v-text-field v-model="member.birthdate" label="생년월일" class="v-text-fields" readonly ref="birthdate"
                   color="black" prepend-icon="mdi-account-outline"/>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex">
                  <v-text-field v-model="member.street" label="주소" class="v-text-fields" readonly ref="street"
                    color="black" prepend-icon="mdi-account-outline"/>
                </div>
              </v-col>
            </v-row>
          </v-card>
          <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">비밀번호 수정</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                  type="password"
                  v-model="password"
                  label="현재 비밀번호"
                  :rules="password_rule"
                  clearable
                  prepend-icon="mdi-lock-outline"
                  color="orange"
              />
                  <v-text-field
                  type="password"
                  v-model="newPassword"
                  label="새로운 비밀번호"
                  :rules="new_password_rule"
                  clearable
                  prepend-icon="mdi-lock-outline"
                  color="orange"
              />
                  <v-text-field
                  type="password"
                  v-model="newPasswordConfirm"
                  label="비밀번호 확인"
                  :rules="new_password_confirm_rule"
                  clearable
                  prepend-icon="mdi-lock-outline"
                  color="orange"
              />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="showDialog = false">취소</v-btn>
                <v-btn color="blue darken-1" text @click="onSubmit()">확인</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
    </div>
    
  </div>
</template>
<script>
import { mapState , mapActions} from 'vuex';
const memberModule = 'memberModule';

export default {
  name: 'MyPageForm',
  data() {
    return {
      isPasswordChanged: false,
      showDialog: false,
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      password_rule: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.'
      ],
      new_password_rule: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.'
      ],
      new_password_confirm_rule: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.'
      ]
    };
  },
  computed: {
    ...mapState(memberModule, ['member']),
    isAuthenticated() {
      return this.$store.state.memberModule.isAuthenticated;
    },
  },
  methods: {
    ...mapActions(memberModule, ['updatePassword','passwordCheck']),

  async onSubmit() {
    if (this.$refs.form.validate()) {
      // 현재 비밀번호, 새로운 비밀번호, 비밀번호 확인 값을 가져옴
      const { password, newPassword, newPasswordConfirm } = this
      this.$emit('submit', {password})

      // 새로운 비밀번호와 비밀번호 확인 값이 일치하는지 검증
      if (newPassword !== newPasswordConfirm) {
        alert("새로운 비밀번호와 비밀번호 확인 값이 다릅니다.");
        return;
      }
      let memberId = JSON.parse(localStorage.getItem('memberId'));

      // 이전 비밀번호 확인
      if (!await this.passwordCheck({ memberId, password })) {
        return;
      }

      const result = await this.updatePassword(
        newPassword
        
      )

      if (result) {
        // 비밀번호가 변경되었다는 메시지 출력
        alert("비밀번호가 변경되었습니다.");
        this.showDialog = false;
        this.isPasswordChanged = true;
      } else {
       // 서버 업데이트 실패시 에러 메시지 출력
       alert("비밀번호 변경에 실패했습니다.");
      }
    }
  }
}
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

.text-right {
  padding-left:450px;
}

</style>
