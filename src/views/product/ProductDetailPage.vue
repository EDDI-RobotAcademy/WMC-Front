<template>
  <v-container>
    <product-detail-form :product="product" />
    <review-list :reviews="reviews"></review-list>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductDetailForm from '@/components/product/ProductDetailForm.vue';
import ReviewList from '@/components/review/ReviewList.vue';

const reviewModule = 'reviewModule';

export default {
  components: {
    ProductDetailForm,
    ReviewList,
  },
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    this.fetchProduct();
    this.fetchReviewList();
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
  },
  computed: {
    ...mapState(reviewModule, ['reviews']),
    productId() {
      return this.$route.params.productId;
    },
  },
};
</script>

<style></style>
