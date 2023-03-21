<template>
    <v-container>
    <div align="center">
      <h2>Vue + Spring 상품 게시판 읽기</h2>
      <product-read v-if="product" :product="product"/>
      <p v-else>로딩중 .......... </p>
    </div>
  </v-container>
</template>

<script>
import ProductRead from '@/components/product/ProductRead.vue'
export default {
  components: { ProductRead },
    name: "ProductReadPage",
    methods: {
        
       
    },
    
}
</script>

<style>
</style>