<template>
  <v-container>
    <form @submit="onSubmit()">
      <div class="comment-register-form">
        <input style="font-weight:bold;" label="작성자" type="text" placeholder="작성자를 입력하세요." v-model="writer" />
        <br>
        <v-textarea
          label="댓글 등록"
          v-model="comment"
          
          class="comment-area"
          :rules="rules"
          counter
          rows="3"
          required
        ></v-textarea>
        <!--<v-btn color="primary" @click="onSubmit">등록</v-btn>-->
        <!--managerCheck-->
        <v-btn
      
          type="submit">
              등록
          </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script>


export default {
  name: "QuestionCommentRegisterForm",
  props: {
        questionBoard: Object,
        required: true
    },
  data() {
    return {
      comment: '',
      writer: '',
      rules: [v => !!v || "내용을 입력해주세요.", v => v.length <= 200 || "최대 200자까지 입력 가능합니다."],
    };
  },
  methods: {
    /*
    onSubmit() {
      const memberId = localStorage.getItem('memberId'); // 현재 로그인한 사용자의 memberId
      this.$emit("submit", { comment: this.comment, memberId: memberId }); // submit 이벤트와 함께 댓글과 memberId를 상위 컴포넌트로 전달
      this.comment = ""; // 댓글 등록 후 폼 초기화
    },*/
    onSubmit() {
        const { comment, writer } = this
        this.$emit("submit", { comment, writer})
        console.log("질문게시판 ID : " + this.questionBoard.questionBoardId)
        console.log("댓글 : " + this.comment)
        console.log("작성자 : " + this.writer)
        this.comment = ""; // 댓글 등록 후 폼 초기화
        },
    },

    created() {
        if(JSON.parse(localStorage.getItem('userInfo'))) {
            //this.commentWriter = JSON.parse(localStorage.getItem('userInfo')).nickName,
            this.memberId = JSON.parse(localStorage.getItem('userInfo')).id
        }
    },

  };
  

</script>

<style scoped>
.comment-register-form {
  margin: 20px 0;
}
</style>
