<template>
    <v-container>
        <div>
            <question-board-read v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else>로딩중...</p>
           
            
           
           <!-- <router-link v-if="isManager" :to="{ name: 'NoticeModifyPage', params: { questionBoardId, questionBoard }}">수정</router-link>-->
           <!--<router-link :to="{ name:QuestionBoardListPage}">돌아가기</router-link>-->
           <br />

            
            <!--댓글 목록-->
            <div class="boards">
                <div>
                  <div class="ml-3">
                    <h2>답변</h2>
                  </div>
                  <div class="comment">
                    <question-comment-list
                        :questionComments="questionComments"
                         />
                  </div>
                </div>
            </div>    

            <!--댓글 등록-->
            <div>
            <!--관리자만 댓글 권한이 있다.-->
            <question-comment-register-form  
                @submit="onSubmit"
                :questionBoard="questionBoard"
            />
            </div>
        </div>
    </v-container>
</template>

<script>

import QuestionBoardRead from '@/components/questionBoard/QuestionBoardRead.vue';
import QuestionCommentList from '@/components/questionBoard/comment/QuestionCommentList.vue';
import QuestionCommentRegisterForm from '@/components/questionBoard/comment/QuestionCommentRegisterForm.vue';
import { mapActions, mapState } from 'vuex';


const questionModule ='questionModule';


export default {
    name: "QuestionBoardReadPage",
    components: { 
        QuestionBoardRead,
        QuestionCommentRegisterForm,
        QuestionCommentList
    },

    props: {
        questionBoardId: {
        type: String,  // 이 부분을 String 타입으로 수정
        required: true
        },
    },

    mounted() {
        this.requestQuestionBoardToSpring(this.questionBoardId);
    },
    
    computed: {
        /*
        isManager() {
        return localStorage.getItem('authorityName') === 'MANAGER';
        },*/
        
        ...mapState(questionModule, [
        'questionBoard', 'questionComments',
    ]),

    },
    methods: {
        ...mapActions(questionModule, [
        'requestQuestionBoardToSpring',
        'requestQuestionCommentListFromSpring',
        'requestQuestionCommentRegisterToSpring',

    ]),
/*
    async onSubmit( payload ){
        const { comment, memberId } = payload
        const questionBoardId = this.questionBoardId
        console.log("댓글 등록할 boardId:" + questionBoardId +"memberId check" + memberId)
        console.log('댓글 내용 확인 :' + comment)
        await this.requestQuestionCommentRegisterToSpring( { comment, questionBoardId, memberId} )
        await this.$route.push({
            name: 'QuestionBoardReadPage', params: { questionBoardId: this.questionBoardId }
        })
    },
    
*/

    async onSubmit( payload ){
        const { writer, comment, questionCommentId } = payload
        const questionBoardId = this.questionBoardId;
        console.log("댓글 등록할 boardId:" + questionBoardId)
        console.log('댓글 내용 확인 :' + comment)
        console.log('작성자 :' + writer)
        await this.requestQuestionCommentRegisterToSpring( { writer, comment, questionBoardId, questionCommentId } );
        await this.requestQuestionCommentListFromSpring(this.questionBoardId);
        //this.questionComments.push(payload);
        
    },
    
},
created() {
    console.log('questionBoardId : ' + this.questionBoardId)
    this.requestQuestionBoardToSpring(this.questionBoardId);
    this.requestQuestionCommentListFromSpring(this.questionBoardId);
},


    
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#question-board-detail {
  margin: 0 auto;
  max-width: 800px;
}
</style>
