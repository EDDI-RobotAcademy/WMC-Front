<template>
    <v-container>
      <div align="center">
        <h2>Q&A 작성</h2>
        <question-board-register-form @submit="onSubmit"/>
      </div>
    </v-container>
  </template>

<script>
import QuestionBoardRegisterForm from '@/components/questionBoard/QuestionBoardRegisterForm.vue';
import { mapActions } from 'vuex'

const questionModule = 'questionModule'

export default {
    components: { QuestionBoardRegisterForm },
    name: "QuestionBoardRegisterPage",
    methods: {
        ...mapActions (questionModule, [
            'requestCreateQuestionBoardToSpring'
        ]),
        async onSubmit (payload) {
            console.log(payload)
            await this.requestCreateQuestionBoardToSpring(payload)
            await this.$router.push({
                name: 'QuestionBoardListPage'
            })
            
        }
    }
}
</script>

<style scoped>
</style>