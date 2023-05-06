<template>
<!--    <v-container>

    <v-card v-for="questionComment in questionComments" :key="questionComment.questionCommentId" class="mb-3">
      <v-card-title class="headline">{{ questionComment.writer }}</v-card-title>
      <v-card-text>{{ questionComment.content }}</v-card-text>
      <v-card-actions>
        <v-btn variant="outlined" class="delete-button" v-if="isManager()" @click="deletequestionComment(questionComment)">
          삭제
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
-->
  <div>
    <v-container>
        <v-card-text v-if="!questionComments || (Array.isArray(questionComments) && questionComments.length === 0)">
            <p>현재 등록된 댓글이 없습니다.</p>
        </v-card-text >
        <v-card-text v-else v-for="(questionComment, index) in questionComments" :key="index">
            <div class="qna-comment">
            <p style="font-weight:bold;">{{ questionComment.writer }} </p>
            <p v-show="commentModify !== index">{{ questionComment.comment }}</p>
            <v-text-field v-model="questionComment.comment" label="댓글 수정" v-show="commentModify === index"></v-text-field>
            <button v-if="commentModify !== index" @click="startModify(index)">수정 | </button>
            <button v-if="commentModify === index" @click="saveComment(questionComment)">수정 완료 | </button>
            <button @click="deleteQuestionComment(questionComment)">&nbsp;삭제</button>
            </div>
        </v-card-text>
    </v-container>
</div>

      

</template>
<script>

import {mapActions, mapState} from "vuex";

import mainRequest from '@/api/mainRequest';
//import ModifyQuestionCommentForm from "@/components/boards/comment/ModifyQuestionCommentForm";


const questionModule ='questionModule';
  
export default {
  name: "QuestionCommentList",
  //components: {ModifyQuestionCommentForm},
  data() {
    return {
      //commentWriter: this.$store.state.resMember.username,
      questionBoard: {},
      commentModify: null,

    }
  },
  props: {
    questionComments:{
      type: Array
    },
    questionComment: {
      type: Object
    },
  },
  

  computed: {
    //...mapState(['resMember'])
  },
  methods: {
    ...mapActions(questionModule, [
      'requestQuestionCommentDeleteToSpring',
    ]),
/*
    startModify(index) {
      this.replyModify = index;
    },

    saveReply(payload) {
      this.replyModify = null;
      const { replyId, replyContent } = payload;
      
      return axios.put(`http://localhost:7777/reply/${replyId}`,
          {replyContent})
          .then((res) => {
              alert("질문 게시글의 댓글 " + replyId + "번 -> " + replyContent  +"로 수정 성공", res.data)
          })
          .catch(() => {
              alert("질문 게시글의 댓글 " + replyId + "번 수정 실패")
          })
        },
*/
/*
    async deleteQuestionComment(payload) {
      const { questionCommentId } = payload;
      console.log(questionCommentId + "questionCommentId")
      await this.requestQuestionCommentDeleteToSpring({questionCommentId})
      this.$router.go(this.$router.currentRoute)
    },
*/
    async deleteQuestionComment(payload) {
      const { questionCommentId } = payload
      console.log("questionCommentId : " + questionCommentId)
      return mainRequest.delete(`/questionBoard/comment/${questionCommentId}`)
          .then(() => {
              alert("댓글 삭제 성공!");
              location.reload();
          })
          .catch(() => {
              alert("문제 발생!");
          });
        },
    //isWriter(reply) {
    //  return this.memberInfoAboutSignIn.userNickName === reply.replyWriter
    //},

    isManager() {
    return localStorage.getItem('authorityName') === 'MANAGER';
    },

  },
}
</script>

<style scoped>

.boards .comment {
  padding-left: 20px;
  padding-top: 15px;
  margin: 10px;

}

.boards .comment .comment-btn {
  padding-left: 15px;
  color: white;
  margin-left: 370px;
}


.comment {
  border-radius: 10px;
  padding: 10px;
  width: 100%
}
.empty-comment {
  padding: 10px;
}
.comments {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(189, 189, 189, 0.5);
  border-radius: 5px;
  background-color: #ffffff;
  margin: 10px auto;
}
.comment-writer {
  margin: 0;
  font-weight: bold;
}
.comment-content {
  margin: 0;
}
.comment-info {
  flex-grow: 1;
}
.comment-actions {
  display: flex;
  align-items: center;
}
.delete-button,
.modify-button,
.save-button {
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #40513B;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 10px;
}
.delete-button:hover,
.modify-button:hover,
.save-button:hover {
  background-color: #728c69;
}
.reply-buttons .save-button {
  background-color: rgb(54, 109, 50);
}


.qna-comment {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}
</style>