<template>
    <v-container>
      <div id="question-board">
        <h1>상품 Q&A</h1>
        <br/>
        <question-board-list :questionBoards="questionBoards"/> <!-- 중요 : 앞하고 뒤 무조건 소문자로 시작 -->
      </div>
      <br/>
      <div style="float: right">
        <router-link :to="{ name: 'QuestionBoardRegisterPage' }">
          <v-btn class="green white--text" rounded depressed small
                 v-if="isLogin == false" @click.prevent="registerAccess">
            게시물 작성
          </v-btn>
          <v-btn class="green white--text" rounded depressed small v-else>
            게시글 작성
          </v-btn>
        </router-link>
        <!--<div style="float: right" class="mr-5 mb-15" v-if="!this.$store.state.resMember.managerCheck">-->
        <div style="float: right" class="mr-5 mb-15">
            <button
                depressed
                btn-name="문의하기"
                @click="registerAccess"/>
            <template>
              <v-dialog v-model="showRegisterBoard" max-width="1000">
                <register-question-board-form />
              </v-dialog>
            </template>
          </div>
      </div>
    </v-container>
  </template>
  
  <script>
  import QuestionBoardList from "@/components/questionBoard/QuestionBoardList.vue";
  //import RegisterQuestionBoardForm from "@/components/questionBoard/RegisterQuestionBoardForm.vue";
  import { mapActions, mapState } from "vuex";
  
  const questionModule = 'questionModule'
  
  export default {
    name: "QuestionBoardListPage",
    components: {
        QuestionBoardList,
       //RegisterQuestionBoardForm,
    },
    computed: {
      ...mapState(questionModule, [
        'questionBoards'
      ]),
    },
    data() {
      return {
        isLogin: false,
        showRegisterBoard: false,
      }
    },
    mounted() {
      this.requestQuestionBoardListToSpring()
      if (this.$store.state.isAuthenticated != false) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    methods: {
      registerAccess() {
        if(this.isLogin == false) {
          alert("로그인이 필요한 기능입니다.")
          this.$router.push("/sign-in")
        }else {
        this.showRegisterBoard = true
        }
      },
      ...mapActions(questionModule,[
        'requestQuestionBoardListToSpring'
      ])
    }
  }
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>