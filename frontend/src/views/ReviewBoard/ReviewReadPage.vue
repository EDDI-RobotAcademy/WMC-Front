<template>
  <v-container>
    <div align="center">
      <h2> 리뷰 게시판 읽기</h2>
      <review-read v-if="review" :review="review"/>
      <p v-else>로딩중 .......... </p>
      <router-link :to="{ name: 'ReviewModifyPage', params: { reviewId } }">
        게시물 수정
      </router-link>
      <button @click="onDelete">삭제</button>
      <router-link :to="{ name: 'ReviewListPage' }">
        돌아가기
      </router-link>
    </div>
  </v-container>
</template>

<script>

import ReviewReadForm from '@/components/reviewBoard/ReviewReadForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: { ReviewReadForm },
    name: "ReviewReadPage",
    props: {
        reviewId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(['review'])
    },
    methods: {
        ...mapActions([
            'requestReviewToSpring',
            'requestDeleteReveiwToSpring'
        ]),
        async onDelete () {
           await this.requestDeleteReviewToSpring(this.ReviewId)
           await this.$router.push({ name: 'ReviewListPage' })
       }
    },
    created () {
        console.log('reviewId: ' + this.reviewId)
        this.requestreviewToSpring(this.reviewId)
    }
}

</script>

<style>

</style>