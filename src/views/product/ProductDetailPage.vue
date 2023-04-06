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
  beforeRouteEnter(to, from, next) {
    const productId = to.params.productId;

    import('@/store').then(({ default: store }) => {
      store
        .dispatch('productModule/fetchProductById', productId)
        .then((product) => {
          next((vm) => {
            vm.product = product;
          });
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          next(false);
        });
    });
  },

  methods: {
    ...mapActions('productModule', ['fetchProductById']),
  },
};
</script>

<style></style>
