<template>
  <v-container>
    <product-list-by-category :products="products" />
  </v-container>
</template>

<script>
import ProductListByCategory from '@/components/product/ProductListByCategory.vue';
import { mapActions, mapState } from 'vuex';

const productModule = 'productModule';

export default {
  components: { ProductListByCategory },
  name: 'ProductListByCategoryPage',
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  watch: {
    $route(to, from) {
      this.requestProductListByCategory(to.params.categoryId);
    },
  },

  computed: {
    ...mapState(productModule, ['products']),
    productItemList() {
      return this.products.map((product) => ({
        ...product,
        imageDataList: product.imageDataList,
      }));
    },
  },
  mounted() {
    this.requestProductListByCategory(this.categoryId);
  },
  methods: {
    ...mapActions(productModule, ['requestProductListByCategory']),
  },
};
</script>

<style></style>
