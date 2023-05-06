<template>
  <v-container>
    <v-row>
      <v-col>
        <review-create-dialog :product="product"/>    
      </v-col>
    </v-row>

    <v-row v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
      <v-col>
        현재 등록된 리뷰가 없습니다!
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="(review, index) in reviews" :key="index" cols="12" sm="6" md="4" lg="3" class="mb-4">
        <v-card @click="openReviewDialog(review)" :loading="loading" class="mx-auto" max-width="374">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-img height="250" :src="review.image"></v-img>
          <v-card-title>{{ review.writer }}님이 작성한 리뷰입니다</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :value="review.rating" color="amber" dense readonly size="14"></v-rating>
            </v-row>
            <div class="my-4 text-subtitle-1">{{ review.regDate }}</div>
            <div>{{ review.content }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination :length="3"></v-pagination>
    <v-dialog  v-model="isReviewDialogOpen">
  <review-detail-dialog class="detail" :selectedReview="selectedReview" @close="selectedReview = null"></review-detail-dialog>
</v-dialog>
  </v-container>
</template>

<script>
import ReviewCreateDialog from '@/components/review/ReviewCreateDialog.vue';
import ReviewDetailDialog from '@/components/review/ReviewDetailDialog.vue';

export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ReviewCreateDialog,
    ReviewDetailDialog,
  },
  data: () => ({
    loading: false,
    selection: 1,
    selectedReview: null,
  }),
  computed: {
    isReviewDialogOpen() {
      return !!this.selectedReview;
    },
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    openReviewDialog(review) {
      this.selectedReview = review;
    },
  },
};
</script>
<style scoped>

.review-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.review-card {
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
img {
  width: 100%;
  height: auto;
}
</style>