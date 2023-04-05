<template>
  <div class="grey lighten-5" style="font-family: Arial">
    <v-row justify="center">
      <v-col cols="auto" style="padding-bottom: 90px">
        <router-link to="/">
          <v-img
            :src="require('@/assets/logo.png')"
            width="120"
            class="mx-auto mb-6"
          />
        </router-link>
        <v-card width="460">
          <v-card-text class="text-center px-12 py-16">
            <v-form @submit.prevent="onSubmit" ref="form">
              <div class="text-h4 font-weight-black mb-10">회원 가입</div>

              <v-divider
                class="mb-8"
                style="border-width: 1px; border-color: black"
              ></v-divider>
              <div align="right">
                <input
                  type="checkbox"
                  style="accent-color: green; margin-right: 6px"
                  name="authority"
                  value="true"
                  v-model="manager"
                />
                <label>관리자로 가입</label>
              </div>
              <div v-if="!manager">
                <div>
                  <div class="d-flex">
                    <v-text-field
                      v-model="email"
                      label="이메일"
                      @change="emailValidation"
                      :rules="email_rule"
                      :disabled="false"
                      required
                    />
                    <v-btn
                      text
                      large
                      outlined
                      style="font-size: 13px"
                      class="mt-3 ml-5"
                      color="teal lighten-1"
                      @click="checkDuplicateEmail"
                      :disabled="!emailPass"
                    >
                      이메일 <br />중복 확인
                    </v-btn>
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="password"
                      label="비밀번호"
                      type="password"
                      :rules="password_rule"
                      :disabled="false"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="password_confirm"
                      label="비밀번호 확인"
                      type="password"
                      :rules="password_confirm_rule"
                      :disabled="false"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="username"
                      label="사용자명"
                      :disabled="false"
                      required
                      color="black"
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="birthdate"
                      label="생년월일 (8자리)"
                      :disabled="false"
                      :rules="birthdate_rule"
                      required
                      color="black"
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="phoneNumber"
                      label="전화번호 ('-'포함 11자리)"
                      :disabled="false"
                      :rules="phoneNumber_rule"
                      required
                      color="black"
                    />
                  </div>
                  <div class="d-flex">
                    <v-text-field
                      v-model="city"
                      label="도시"
                      :disabled="true"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="street"
                      label="기본 주소"
                      :disabled="true"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="addressDetail"
                      label="상세 주소"
                      :disabled="false"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="zipcode"
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

                  <v-btn
                    type="submit"
                    block
                    x-large
                    rounded
                    class="mt-6"
                    color="purple lighten-1"
                    :disabled="(emailPass & streetPass) == false"
                  >
                    가입하기
                  </v-btn>
                </div>
              </div>
              <div v-else>
                <div>
                  <div class="d-flex">
                    <v-text-field
                      class="mt-3"
                      v-model="managerCode"
                      label="관리자코드 입력해주세요"
                      outlined
                      :disabled="false"
                      required
                      color="black"
                    />
                    <v-btn
                      text
                      large
                      style="font-size: 13px; height: 55px"
                      class="mt-3 ml-5 mr-0"
                      @click="checkManagerCode"
                      :disabled="false"
                    >
                      관리자 코드확인
                    </v-btn>
                  </div>
                  <div class="d-flex">
                    <v-text-field
                      v-model="email"
                      label="이메일"
                      outlined
                      @change="emailValidation"
                      color="black"
                      hint="특수문자 제외 2자리 이상"
                      :rules="email_rule"
                      :disabled="false"
                      required
                    />
                    <v-btn
                      text
                      large
                      style="font-size: 13px; height: 55px"
                      class="mt-0 ml-5 mr-0"
                      @click="checkDuplicateEmail"
                      :disabled="!emailPass"
                    >
                      이메일 중복검사
                    </v-btn>
                  </div>
                  <div class="d-flex">
                    <v-text-field
                      v-model="password"
                      label="비밀번호"
                      type="password"
                      outlined
                      color="black"
                      :rules="password_rule"
                      :disabled="false"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="password_confirm"
                      label="비밀번호 확인"
                      type="password"
                      outlined
                      color="black"
                      :rules="password_confirm_rule"
                      :disabled="false"
                      required
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="username"
                      label="사용자명"
                      :disabled="false"
                      required
                      outlined
                      color="black"
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="birthdate"
                      label="생년월일 (8자리)"
                      :disabled="false"
                      :rules="birthdate_rule"
                      required
                      outlined
                      color="black"
                    />
                  </div>

                  <div class="d-flex">
                    <v-text-field
                      v-model="phoneNumber"
                      label="전화번호 ('-'포함 11자리)"
                      :disabled="false"
                      :rules="phoneNumber_rule"
                      required
                      outlined
                      color="black"
                    />
                  </div>
                  <v-btn
                    type="submit"
                    block
                    x-large
                    style="height: 55px"
                    :disabled="(emailPass & managerPass) == false"
                  >
                    가입하기
                  </v-btn>
                </div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUpForm',
  data () {
    return {
      manager: false,
      managerCode: '',

      email: '',
      password: '',
      password_confirm: '',
      phoneNumber: '',

      username: '',
      birthdate: '',

      city: '',
      street: '',
      addressDetail: '',
      zipcode: '',

      managerPass: false,
      emailPass: false,
      streetPass: false,

      email_rule: [
        (v) => !!v || '이메일을 입력해주세요.',
        (v) => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식을 입력하세요.'
        }
      ],
      password_rule: [
        (v) =>
          this.state === 'ins'
            ? !!v || '패스워드는 필수 입력사항입니다.'
            : true,
        (v) =>
          !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.'
      ],
      password_confirm_rule: [
        (v) =>
          this.state === 'ins'
            ? !!v || '패스워드는 필수 입력사항입니다.'
            : true,
        (v) =>
          !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
        (v) => v === this.password || '패스워드가 일치하지 않습니다.'
      ],
      phoneNumber_rule: [
        (v) => !!v || '전화번호를 입력 해주세요.',
        (v) => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /010-\d{4}-\d{4}/
          return (
            pattern.test(replaceV) ||
            '전화번호 11자리를 입력해주세요. ("-"포함)'
          )
        }
      ],
      birthdate_rule: [
        (v) => !!v || '생년월일 8자리를 입력해주세요.',
        (v) => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern =
            /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
          return pattern.test(replaceV) || '생년월일 형식을 입력하세요.'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.manager) {
          const authorityName = 'MANAGER'
          const managerCode = this.managerCode
          const managerCheck = this.manager
          const { email, password, username, birthdate, phoneNumber } = this
          this.$emit('submit', {
            email,
            password,
            username,
            birthdate,
            authorityName,
            managerCheck,
            managerCode,
            phoneNumber
          })
        } else {
          const authorityName = 'MEMBER'
          const managerCheck = this.manager
          const {
            email,
            password,
            username,
            birthdate,
            city,
            street,
            addressDetail,
            zipcode,
            phoneNumber
          } = this
          this.$emit('submit', {
            email,
            password,
            username,
            birthdate,
            authorityName,
            managerCheck,
            city,
            street,
            addressDetail,
            zipcode,
            phoneNumber
          })
        }
      } else {
        alert('올바른 정보를 입력하세요!')
      }
    },
    emailValidation () {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

      if (emailValid) {
        this.emailPass = true
      }
    },
    checkDuplicateEmail () {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

      if (emailValid) {
        const { email } = this
        axios
          .post(`http://localhost:7777/member/check-email/${email}`)
          .then((res) => {
            if (res.data) {
              alert('사용 가능한 이메일입니다!')
              this.emailPass = true
            } else {
              alert('중복된 이메일입니다!')
              this.emailPass = false
            }
          })
      }
    },
    checkManagerCode () {
      const { managerCode } = this
      axios
        .post(`http://localhost:7777/member/check-manager/${managerCode}`)
        .then((res) => {
          if (res.data) {
            alert('관리자 코드 확인하였습니다.')
            this.managerPass = true
          } else {
            alert('일치하는 관리자 코드가 없습니다.')
            this.managerPass = false
          }
        })
    },
    callDaumAddressApi () {
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

          this.city = data.sido
          this.zipcode = data.zonecode
          this.street = data.sigungu + ' ' + fullRoadAddr

          this.streetPass = true
        }
      }).open()
    }
  }
}
</script>

<style scoped></style>
