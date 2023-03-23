<template>
  <v-container>
    <v-row>
      <v-col>
        <router-link to="/product-register-page">
          <v-btn color="#a1887f" outlined>상품 등록 하러가기</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="!products || (Array.isArray(products) && products.length === 0)"
      >
        현재 등록된 상품이 없습니다!
      </v-col>
      <v-col
        v-else
        v-for="(product, index) in products"
        :key="product.productId"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            :src="product.firstPhoto ? getImagePath(product.firstPhoto) : ''"
            aspect-ratio="1"
            class="grey lighten-2"
          ></v-img>

          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-subtitle>{{ product.price }}₩</v-card-subtitle>
          <v-card-actions>
            <v-btn small color="#a1887f" @click="addToCart(product)"
              >장바구니에 담기</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mt-5">
          <v-card-title>Cart</v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in cart" :key="index">
              <v-list-item-title
                >{{ item.name }} - Quantity: {{ item.quantity }} - Total: won{{
                  item.price * item.quantity
                }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
          <v-card-subtitle>Total: {{ total }}won</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'ProductList',
  components: {
    Carousel,
    Slide,
  },
  props: {
    products: {
      type: Array,
    },
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    console.log('products:', this.products);
  },
  computed: {
    total() {
      let sum = 0;
      for (let item of this.cart) {
        sum += item.price * item.quantity;
      }
      return sum;
    },
  },
  methods: {
    addToCart(product) {
      let index = this.cart.findIndex((item) => item.name === product.name);
      if (index === -1) {
        this.cart.push({ ...product, quantity: 1 });
      } else {
        this.cart[index].quantity += 1;
      }
    },
    getImagePath(imageData) {
      console.log('imageData:', imageData);
      return require(`@/${imageData}`);
    },
  },
};
</script>

<style>
.shopping-mall {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}
.cart-container {
  margin-top: 50px;
}
</style>
