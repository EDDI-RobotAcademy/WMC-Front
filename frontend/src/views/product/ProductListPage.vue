<template>
    <v-container>
        <h2>상품 리스트 보여주기</h2>
        <router-link :to="{ name: 'ProductRegisterPage' }">
            상품등록
        </router-link>
    </v-container>
</template>

<script>
export default {
    name: "ProductListPage",
}
</script>

<style>

</style>