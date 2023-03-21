<template>
    <v-container>
        <h2>게시물 작성</h2>
        <product-register-form @submit="onSubmit"/>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import ProductRegisterForm from '../../components/product/ProductRegisterForm.vue';
export default {
    components: { ProductRegisterForm },
    name: "ProductRegisterPage",
    methods: {
      ...mapActions ([
            'requestCreateProductToSpring'
        ]),
        async onSubmit (payload) {
            await this.requestCreateProductToSpring(payload)
            await this.$router.push({
                name: 'ProductListPage'
            })
        }
    }
    
}
</script>

<style>

</style>