<template>
    <div >
        <h4>선글라스</h4>
        <div class="body-container">
            <product-item-list :products="products"/>
        </div>
    </div>

</template>

<script>
import ProductItemList from '@/components/product/productItem/ProductItemList.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: { ProductItemList },
  name: 'ProductItemListPage',
  computed: {
    ...mapState({
      products: state => state.products.map(product => ({
        ...product,
        imageDataList: product.imageDataList
      }))
    })
  },
  mounted () {
    this.requestProductItemListToSpring()
  },
  methods: {
    ...mapActions([
      'requestProductItemListToSpring'
    ])
  }

}
</script>

<style>
