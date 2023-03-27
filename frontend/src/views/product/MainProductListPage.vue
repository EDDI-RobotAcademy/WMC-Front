<template>
  <v-container>
    <div class="container-text">
      <h5 class="mb-auto">🎀가장 주목해야할 이달의 신상품🎀</h5>
    </div>
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
.body {
  margin: 0px;
}
.container-text{
  display: flex;
}


</style>