<template>
  <div style="padding:24px;">
    <br/>
    <br/>
    <h4 class="body-text">2023 선글라스 컬렉션
      <button>&nbsp;<&nbsp; </button>
      <button> &nbsp;></button>
    </h4>
    <br/>
      <div class="body-container">
        <main-product-list :products="products"/>
      </div>
  </div>
</template>

<script>
import MainProductList from '../../components/product/MainProductList.vue'
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
  components: { MainProductList },
  name: 'MainProductListPage',
  computed: {
    ...mapState(productModule, ['products']),
    productItemList() {
      return this.products.map(product => ({
        ...product,
        imageDataList: product.imageDataList
      }))
    }
  }, 
  mounted () {
    this.requestMainProductListToSpring()
  },
  methods: {
    ...mapActions(productModule, [
      'requestMainProductListToSpring'
    ])
  }
} 
</script>

<style>
.body-container{

  justify-content: center;
}
.body-text{
  margin-bottom: 0rem;
  text-align: left;
  }

</style>
