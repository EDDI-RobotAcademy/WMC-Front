<template>
  <v-container>
    <h2>게시물 작성</h2>
    <review-register-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import ReviewRegisterForm from '@/components/reviewBoard/ReviewRegisterForm.vue'
import { mapActions } from 'vuex'

export default {
    components: { ReviewRegisterForm },
    name: "ReviewRegisterPage",
    methods: {
        ...mapActions ([
            'requestCreateReviewToSpring'
        ]),
        async onSubmit (payload) {
            const review = await this.requestCreateReviewToSpring(payload)
            console.log('review: ' + JSON.stringify(review.data))
            await this.$router.push({
                name: 'ReviewReadPage',
                params: { reviewId: review.data.reviewId.toString() }
            })
        }
    }
}

</script>

<style>

</style>