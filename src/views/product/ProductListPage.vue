<template>
    <v-container>
        <h2></h2>
        <product-list :products="products"/>
    </v-container>
</template>

<script>
import ProductList from '../../components/product/ProductList.vue'
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'


export default {
  components: { ProductList },
  name: 'ProductListPage',
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

</style>
