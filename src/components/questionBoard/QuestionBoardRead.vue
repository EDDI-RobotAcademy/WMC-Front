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
            <div>
                <span v-if="questionBoard.regDate" style="color: gray; font-size: 13px;">{{ questionBoard.regDate.slice(0, 10) }} {{ questionBoard.regDate.slice(11, 16) }}</span>
                <span style="float: right;">
                    <!--<v-btn v-if="loginCheck()" @click="onModify" icon>-->
                    <v-btn icon>
                        <v-icon>mdi-pencil7</v-icon>
                    </v-btn>
                    <!--<v-btn v-if="loginCheck()" @click="onDelete" icon>-->
                    <v-btn icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </span>
            </div>
        </div>
            <v-divider class="mt-3 mb-3"></v-divider>
            <div>
                <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'QuestionBoardListPage' }" style="float: right;">
                  목록
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuestionBoardRead',
    props: {
        questionBoard: Object,
    },
    methods: {

    },
    created() {
    console.log("questionBoard data:", this.questionBoard);
    }
}
</script>