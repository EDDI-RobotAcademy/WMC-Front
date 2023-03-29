<template>
  <v-container>
    <h2>리뷰 게시판</h2>
    <router-link :to="{ name: 'ReviewRegisterPage' }">
      게시물 작성
    </router-link>
    <review-list-form :reviews="reviews"/>
  </v-container>
</template>

<script>

import reviewListForm from '@/components/reviewBoard/ReviewListForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: { reviewListForm },
  name: "ReviewListPage",
  computed: {
    ...mapState([
      'reviews'
    ]),
  },
  mounted () {
    this.requestReviewListToSpring()
  },
  methods: {
    ...mapActions([
      'requesReviewListToSpring'
    ])
  }
}

</script>

<style>

</style>