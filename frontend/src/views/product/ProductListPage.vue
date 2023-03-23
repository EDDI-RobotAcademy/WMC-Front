<template>
    <v-container>
        <h2>SAPPUN</h2>
        <product-list :products="products"/>
    </v-container>
</template>

<script>
import ProductList from '../../components/product/ProductList.vue';
import { mapActions, mapState } from 'vuex';

export default {
    components: { ProductList },
    name: "ProductListPage",
    computed: {
  ...mapState({
    products: state => state.products.map(product => ({
      ...product,
      imageDataList: product.imageDataList
    }))
  })
    },
    mounted() {
      this.requestProductListToSpring()
    },
    methods: {
      ...mapActions([
        'requestProductListToSpring'
      ])
    }

}
</script>

<style>

</style>