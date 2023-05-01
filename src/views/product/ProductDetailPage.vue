<template>
    <v-container>
      <product-detail-form :product="product" />
      <review-list :product="product"></review-list>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import ProductDetailForm from '@/components/product/ProductDetailForm.vue';
  import ReviewList from '@/components/review/ReviewList.vue';
  import ReviewDetailDialog from '@/components/review/ReviewDetailDialog.vue'
  import ReviewCreateDialog from '@/components/review/ReviewCreateDialog.vue'

  const reviewModule = 'reviewModule'

  export default {
    components: { 
      ProductDetailForm,
      ReviewList,
      ReviewDetailDialog,
      ReviewCreateDialog
      },
    data() {
      return {
        product: null,
      };
    },
    mounted() {
      this.fetchProduct();
    },
    methods: {
      ...mapActions('productModule', ['fetchProductById']),
      async fetchProduct() {
        const productId = this.$route.params.productId;
        this.product = await this.fetchProductById(productId);
      },
      ...mapActions (reviewModule, [
            'requestCreateReviewToSpring'
        ]),
        async onSubmit (payload) {
            console.log(payload)
            await this.requestCreateReviewToSpring(payload)
            await this.$router.push({
                name: 'ReviewList'
            })
        }
    },
    computed: {
    productId() {
      return this.$route.params.productId;
    },
  },
  };
  </script>
  
  <style></style>
  