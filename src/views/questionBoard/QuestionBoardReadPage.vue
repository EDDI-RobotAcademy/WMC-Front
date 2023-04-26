<template>
    <v-container>
        <div>
            <question-board-read :questionBoard="questionBoard" v-if="questionBoard"/>
           
            
           
           <!-- <router-link v-if="isManager" :to="{ name: 'NoticeModifyPage', params: { questionBoardId, questionBoard }}">수정</router-link>-->
           <!--<router-link :to="{ name:QuestionBoardListPage}">돌아가기</router-link>-->
           <br />
            <div>
                <v-btn
                class="red white--text"
                rounded
                depressed
                small
                @click="deleteQuestionBoard(questionBoard.questionBoardId)"
                >
                삭제
                </v-btn>
                <router-link :to="{ name: 'QuestionBoardUpdatePage', params: { questionBoardId: questionBoard.questionBoardId } }">
                    <v-btn class="green white--text" rounded depressed small>
                    수정
                    </v-btn>
                </router-link>
                <router-link :to="{ name: 'QuestionBoardListPage', params: { questionCategoryId: questionBoard.questionCategoryId } }">
                    <v-btn class="grey white--text" rounded depressed small>
                    목록
                    </v-btn>
                </router-link>
            </div>
            <div class="boards">
                <div>
                  <div class="ml-3">
                    <h2>답변</h2>
                  </div>
                  <div class="comment">
                    <question-comment-list
                        :question-board=questionBoard
                        :questionComments="questionComments"/>
                  </div>
                </div>
            </div>
              <!--관리자만 댓글 권한이 있다.-->
                <question-comment-register-form
                    @submit="onSubmitRegister"

                />

                
              <div>

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
    components: { QuestionBoardRead },
    props: {
        questionBoardId: {
        type: String,
        required: true,
        },
    },
    components: {
        QuestionCommentRegisterForm,
        QuestionCommentList,
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

    async onSubmitRegister( payload ){
        const { comment, memberId } = payload
        const questionBoardId = this.questionBoardId
        console.log("댓글 등록" + questionBoardId)
        await this.requestQuestionCommentRegisterToSpring( { comment, questionBoardId, memberId} )
        await this.$route.push({
            name: 'QuestionBoardReadPage', params: { questionBoardId: this.questionBoardId }
        })
    },
},
created() {
    //this.requestQuestionBoardToSpring(this.questionBoardId);
    this.requestQuestionCommentListFromSpring(this.questionBoardId)
},


    /*
    methods: {
        ...mapActions(questionModule,[
            'requestQuestionBoardToSpring'
        ]),
    },*/
    /*
    async created () {
        console.log('questionBoardId : ' + this.questionBoardId)
        await this.requestQuestionBoardToSpring(this.questionBoardId)
    }
    */

    
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