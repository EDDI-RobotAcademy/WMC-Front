<template>
    <v-container>
      <Product-register-form @submit="onSubmit" />
    </v-container>
  </template>

<script>
import ProductRegisterForm from '@/components/product/ProductRegisterForm.vue'
import { mapActions } from 'vuex'

export default {
  components: { ProductRegisterForm },
  name: 'ProductRegisterPage',
  methods: {
    ...mapActions(['requestCreateProductToSpring']),
    async onSubmit (payload) {
      await this.requestCreateProductToSpring(payload)
      await this.$router.push({
        name: 'ProductListPage'
      })
    }
  }
}
</script>

  <style scoped>
  .product-registration-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  label {
    font-weight: bold;
  }
  input,
  textarea {
    width: 300px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: white;
    color: white;
    cursor: pointer;
  }
  </style>
