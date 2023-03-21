<template>
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>상품명</td>
          <td>
            <input type="text" v-model="productName"/>
          </td>
        </tr>
        <tr>
          <td>상품 상세 설명</td>
          <td>
            <textarea cols="50" rows="20" v-model="content"/>
          </td>
        </tr>
        <tr>
          <td>가격</td>
          <td>
            <input type="number" v-model="price"/>
          </td>
        </tr>
      </table>
  
      <div>
        <button type="submit">등록</button>
        <router-link :to="{ name: 'ProductListPage' }">
          취소
        </router-link>
      </div>
    </form>
  </template>
  
  <script>
  export default {
      name: "ProductRegisterForm",
      data () {
          return {
              productName: '상품명을 입력하세요.',
              content: '내용을 입력하세요.',
              price: 0,
          }
      },
      methods: {
          onSubmit () {
              const { productName, content, price } = this
              this.$emit('submit', { productName, content, price })
          }
      }
  }
  </script>
  
  <style>
  </style>