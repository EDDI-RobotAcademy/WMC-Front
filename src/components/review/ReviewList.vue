<template>
  <v-container>
    <v-row v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
      <v-col>
        현재 등록된 리뷰가 없습니다!
      </v-col>
    </v-row>

    <div v-else class="review-grid">
      <v-card
        v-for="(review, index) in reviews"
        :key="index"
        @click="openReviewDialog(review)"
        :loading="loading"
        class="review-card"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <div class="review-card-content">
          <v-img
            :src="review.firstPhoto ? getImagePath(review.firstPhoto) : ''"
            class="review-photo"
            aspect-ratio="1"
          ></v-img>
          <div class="review-info">
            <v-card-title>{{ review.username }}님이 작성한 리뷰입니다</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="review.rating"
                  color="amber"
                  dense
                  readonly
                  size="14"
                ></v-rating>
              </v-row>
              <div class="review-content">{{ review.content }}</div>
            </v-card-text>
          </div>
        </div>
      </v-card>
    </div>
    <!-- <v-pagination :length="3"></v-pagination> -->
    <v-dialog :value="isReviewDialogOpen" @input="closeReviewDialog">
      <review-detail-dialog
        class="detail"
        :selectedReview="selectedReview"
        @close="closeReviewDialog"
      ></review-detail-dialog>
    </v-dialog>
  </v-container>
</template>


<script>
import ReviewDetailDialog from '@/components/review/ReviewDetailDialog.vue';

export default {
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  components: {
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
    getImagePath(imageData) {
      return `https://wmc-s3-bucket.s3.ap-northeast-2.amazonaws.com/${imageData}`;
    },
    closeReviewDialog() {
      this.selectedReview = null;
    },
  },
};
</script>
<style scoped>
.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  grid-gap: 1rem;
}

.review-card {
  border: none;
  background-color: #f9f9f9;
  position: relative;
}

.review-card::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #ccc;
}

.review-card-content {
  display: flex;
  align-items: center;
}

.review-photo {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  margin-right: 1rem;
}

.review-info {
  flex: 1;
}

.review-content {
  margin-top: 1rem;
}
</style>
