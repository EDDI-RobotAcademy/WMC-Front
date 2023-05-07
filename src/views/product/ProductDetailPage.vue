<template>
  <v-container>
    <product-detail-form :product="product" :liked="liked" />
    <review-list :reviews="reviews"></review-list>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductDetailForm from '@/components/product/ProductDetailForm.vue';
import ReviewList from '@/components/review/ReviewList.vue';
import mainRequest from '@/api/mainRequest';

const reviewModule = 'reviewModule';

export default {
  components: {
    ProductDetailForm,
    ReviewList,
  },
  data() {
    return {
      product: null,
      liked: false,
    };
  },
  mounted() {
    this.fetchProduct();
    this.fetchReviewList();
    this.fetchLikedStatus();
  },
  methods: {
    ...mapActions('productModule', ['fetchProductById']),
    async fetchProduct() {
      const productId = this.$route.params.productId;
      this.product = await this.fetchProductById(productId);
    },
    ...mapActions(reviewModule, ['requestReviewListToSpring']),
    async fetchReviewList() {
      const productId = this.$route.params.productId;
      await this.requestReviewListToSpring(productId);
    },
    async fetchLikedStatus() {
      if (!this.isAuthenticated) {
        return;
      }

      const memberId = localStorage.getItem('memberId');
      const productId = this.$route.params.productId;

      try {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
          alert('사용자 정보를 찾을 수 없습니다');
          return;
        }

        const token = JSON.parse(userInfo);
        const response = await mainRequest.get(
          `/member/liked/${memberId}/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.liked = response.data;
          console.log('liked:', this.liked);
        } else {
          alert('좋아요 상태를 가져오는데 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('Error while fetching liked status:', error);
        alert('좋아요 상태를 가져오는데 실패했습니다. 다시 시도해주세요.');
      }
    },
  },
  computed: {
    ...mapState(reviewModule, ['reviews']),
    productId() {
      return this.$route.params.productId;
    },
    isAuthenticated() {
      return !!localStorage.getItem('userInfo');
    },
  },
};
</script>

<style></style>
