<template>
    <v-container>
      <product-detail-form :product="product" />
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import ProductDetailForm from '@/components/product/ProductDetailForm.vue';
  
  export default {
    components: { ProductDetailForm },
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
    },
  };
  </script>
  
  <style></style>
  