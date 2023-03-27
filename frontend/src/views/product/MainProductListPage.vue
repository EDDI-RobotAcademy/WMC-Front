<template>
  <v-container>
      <h2></h2>
      <main-product-list :products="products"/>
  </v-container>
</template>

<script>
import MainProductList from '../../components/product/MainProductList.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: { MainProductList },
  name: "MainProductListPage",
  computed: {
...mapState({
  products: state => state.products.map(product => ({
    ...product,
    imageDataList: product.imageDataList
  }))
})
  },
  mounted() {
    this.requestMainProductListToSpring()
  },
  methods: {
    ...mapActions([
      'requestMainProductListToSpring'
    ])
  }

}
</script>

<style>

</style>