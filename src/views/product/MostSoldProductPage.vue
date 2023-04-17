<template>
  <div style="padding:24px;">
    <br/>
    <br/>
    <h4 class="body-text">인기상품
      <button>&nbsp;<&nbsp; </button>
      <button> &nbsp;></button>
    </h4>
    <br/>
      <div class="body-container">
        <most-sold-product-list :products="mostSoldProducts"/>
      </div>
  </div>
</template>

<script>
import MostSoldProductList from '@/components/product/MostSoldProductList.vue';
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
  name: 'MostSoldProductPage',
  components: {
    MostSoldProductList,
  },
  computed: {
    ...mapState(productModule, ['mostSoldProducts']),
    productItemList() {
      return this.mostSoldProducts.map(product => ({
        ...product,
        imageDataList: product.imageDataList
      }))
    }
  },
  mounted () {
    this.requestMostSoldProductListToSpring()
  },
  methods: {
    ...mapActions(productModule, [
      'requestMostSoldProductListToSpring'
    ])
  }
};
</script>

<style></style>
