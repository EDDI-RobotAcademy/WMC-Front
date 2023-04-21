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
        </div>
    </v-container>
</template>

<script>

import QuestionBoardRead from '@/components/questionBoard/QuestionBoardRead.vue';
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

    mounted() {
        this.requestQuestionBoardToSpring(this.questionBoardId);
    },
    computed: {
        /*
        isManager() {
        return localStorage.getItem('authorityName') === 'MANAGER';
        },*/
        
        ...mapState(questionModule, [
        'questionBoard'
    ]),

    },
    methods: {
        ...mapActions(questionModule, [
        'requestQuestionBoardToSpring']),
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