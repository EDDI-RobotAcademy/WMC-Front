<template>
    <div>
        <h3>상품 게시물 목록(구조를 나중에 바꾸기)</h3>
        <table>
            <tr>
                <th align="center" width="100">No</th>
                <th align="center" width="640">상품명</th>
                <th align="center" width="300">등록일자</th>
            </tr>
            <tr v-if="!products || (Array.isArray(products) && products.length === 0)">
                <td colspan="3">
                    현재 등록된 게시물이 없습니다!
                </td>
            </tr>
            <tr v-else v-for="product in products" :key="product.productId">
                <td align="center">
                  {{ product.productId }}
                </td>
                <td align="left">
                  {{ product.productName }}
                </td>
                <td align="center">
                  {{ product.regDate }}
                </td>
              </tr>  
        </table>
    </div>
</template>

<script>
export default {
    name: "ProductList",
    props: {
        products: {
            type: Array
        }
    }
}
</script>

<style>