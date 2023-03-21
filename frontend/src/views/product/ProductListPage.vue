<template>
    <v-container>
        <h2>상품 리스트 보여주기</h2>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품등록
        </router-link>
        <product-list @products="products"/>
    </v-container>
</template>

<script>
import ProductList from '../../components/product/ProductList.vue';
import { mapActions, mapState } from 'vuex';

export default {
    components: { ProductList },
    name: "ProductListPage",
    computed: {
      ...mapState([
        'products'
      ]),
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