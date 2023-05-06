<template>
    <div>
        <div>
            <div v-if="questionBoard">
                <div>
                    {{ questionBoard.questionType }}
                </div>
                <div>
                    <span>
                        <h1>{{ questionBoard.title}}</h1>
                    </span>
                </div>
                <div>
                    <span>
                        {{ questionBoard.writer}}
                    </span>
                </div>
            </div>
            <v-divider class="mt-3 mb-3"></v-divider>
        </div>
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
            <router-link :to="{ name: 'QuestionBoardUpdatePage', params: { questionBoardId: questionBoard.questionBoardId} }">
                <v-btn class="green white--text" rounded depressed small>
                수정
                </v-btn>
            </router-link>
            <router-link :to="{ name: 'QuestionBoardListPage', params: { questionCategoryId: questionBoard.questionBoardId } }">
                <v-btn class="grey white--text" rounded depressed small>
                목록
                </v-btn>
                <v-btn
                v-if="isManager()"
                class="brown darken-2 white--text mb-5 mr-2"
                :to="{
                    name: 'QuestionBoardRegisterPage',
                    params: { parentBoardId: questionBoard.questionBoardId} }"
                    style="float: right;">
                답글 달기
                </v-btn>   
            </router-link>
            
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: 'QuestionBoardRead',
    props: {
        questionBoard: Object,
        required: true
    },
    methods: {
        isManager() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            return userInfo && userInfo.authorityName ==='MANAGER'
          }

    },
    created() {
    console.log("questionBoard data:", this.questionBoard);
    }
}
</script>
<style scoped>

</style>
