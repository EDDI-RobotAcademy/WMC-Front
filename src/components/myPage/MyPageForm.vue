<template>
    <div>
      <div class="container">
            <v-card tile flat class="mypage-card">
              <v-row>
                <v-col cols="12" class="text-h5">
                  <h3>회원 정보</h3>
                </v-col>
                 <v-row>
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
              <v-row>
                  <v-btn text color="grey" v-on:click="showDialog = true"><span>비밀번호 수정</span></v-btn>
             
                  <v-btn text color="grey" v-on:click="showAddressDialog = true"><span>주소 수정</span></v-btn>
               
                <v-btn text color="grey" v-on:click="resign"><span>회원 탈퇴</span></v-btn>

              </v-row>
              </v-card>
            <v-dialog v-model="showDialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">비밀번호 수정</v-card-title>
                <v-card-text>
                  <v-form ref="form" v-on:submit.prevent="onSubmitPassword">
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
                  <v-btn color="blue darken-1" text @click="onSubmitPassword()">확인</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            <v-dialog v-model="showAddressDialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">주소 수정</v-card-title>
                <v-card-text>
                  <v-form ref="addressForm" v-on:submit.prevent="onSubmitAddress">
                    <div class="d-flex">
                      <v-text-field
                        v-model="newCity"
                        label="도시"
                        :disabled="true"
                        required
                      />
                    </div>
                    <div class="d-flex">
                      <v-text-field
                        v-model="newStreet"
                        label="기본 주소"
                        :disabled="true"
                        required
                      />
                    </div>
                    <div class="d-flex">
                      <v-text-field
                        v-model="newAddressDetail"
                        label="상세 주소"
                        :disabled="false"
                        required
                      />
                    </div>
                    <div class="d-flex">
                      <v-text-field
                        v-model="newZipcode"
                        label="우편번호"
                        :disabled="true"
                        required
                      />
                      <v-btn
                        text
                        large
                        outlined
                        style="font-size: 13px"
                        class="mt-3 ml-5"
                        color="blue lighten-1"
                        @click="callDaumAddressApi"
                        :disabled="false"
                      >
                        주소 확인
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="showAddressDialog = false">취소</v-btn>
                  <v-btn color="blue darken-1" text @click="onSubmitAddress()">확인</v-btn>
                </v-card-actions>
             
              </v-card>
            </v-dialog>

      </div>
      
    </div>
  </template>
  <script>
  import mainRequest from "@/api/mainRequest";
  import { mapState , mapActions} from 'vuex';
  const memberModule = 'memberModule';
  
  export default {
    name: 'MyPageForm',
    data() {
      return {
        showAddressDialog: false,
        city: '',
        street: '',
        addressDetail: '',
        zipcode: '',
        newCity: '',
        newStreet: '',
        newAddressDetail: '',
        newZipcode: '',
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
      ...mapActions(memberModule, ['updatePassword','passwordCheck','updateAddress','reqResign']),

      callDaumAddressApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullRoadAddr = data.roadAddress
          let extraRoadAddr = ''

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr +=
              extraRoadAddr !== ''
                ? ', ' + data.buildingName
                : data.buildingName
          }

          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')'
          }

          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr
          }

          this.newCity = data.sido
          this.newZipcode = data.zonecode
          this.newStreet = data.sigungu + ' ' + fullRoadAddr
        }
      }).open()
    },
    async onSubmitAddress() {
      if(this.newCity == '') {
        alert("도시가 입력되지 않았습니다.");
        return;
      }

      if (this.newAddressDetail !=='') {
        const { newCity, newStreet, newAddressDetail, newZipcode } = this;
        
        let memberId = JSON.parse(localStorage.getItem('memberId'));

        await this.updateAddress({memberId, newCity, newStreet, newAddressDetail, newZipcode })
        this.showAddressDialog = false;
        
        window.location.reload(true);
      } else {
        alert('상세정보를 입력하세요!');
      }
    },

    async resign() {
  let token = JSON.parse(localStorage.getItem('userInfo'));
  if(confirm("정말로 회원 탈퇴 하시겠습니까?")) {
    console.log("폼 코드 : " + token);
    await this.reqResign(token);
    window.location.reload(true);
    window.location.href = '/';
  }

},


    async onSubmitPassword() {
      if (this.$refs.form.validate()) {
        // 현재 비밀번호, 새로운 비밀번호, 비밀번호 확인 값을 가져옴
        const { password, newPassword, newPasswordConfirm } = this
        this.$emit('submit', {password})
  
        // 새로운 비밀번호와 비밀번호 확인 값이 일치하는지 검증
        if (newPassword !== newPasswordConfirm) {
          alert("새로운 비밀번호와 비밀번호 확인 값이 다릅니다.");
        }
        let memberId = JSON.parse(localStorage.getItem('memberId'));
  
        // 이전 비밀번호 확인
        let passwordChecked = await this.passwordCheck({ memberId, password }) 
        let isChecked = Boolean(passwordChecked);
        console.log("passwordChecked 호출 "+ isChecked);
        if (!isChecked) {
          return;
        }  
        console.log('반환하는지 확인해봅시다')
        
  
        let result = await this.updatePassword({ 
          memberId, newPassword 
        })
        let isUpdate = Boolean(result);
        console.log("updatePassword 호출" + isUpdate);
        if (isUpdate) {
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
  