<template>
  <v-container>
    <v-row>
      <v-col>
       
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
        v-for="(mainProduct, index) in mainProducts"
        :key="mainProduct.mainProductId"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            :src="mainProduct.firstPhoto ? getImagePath(mainProduct.firstPhoto) : ''"
            aspect-ratio="1"
            class="grey lighten-2"
          ></v-img>

          <v-card-title>{{ mainProduct.name }}</v-card-title>
          <v-card-text>{{ mainProduct.description }}</v-card-text>
          <v-card-subtitle>{{ mainProduct.price }}₩</v-card-subtitle>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'MainProductList',
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
    console.log('mainProducts:', this.mainProducts);
  },
  computed: {
    ...mapState(['isAuthenticated']),

    total() {
      let sum = 0;
      for (let item of this.cart) {
        sum += item.price * item.quantity;
      }
      return sum;
    },
  },
  mounted() {
    if (localStorage.getItem('userInfo')) {
      this.$store.state.isAuthenticated = true;
    } else {
      this.$store.state.isAuthenticated = false;
    }
  },
  methods: {
    addToCart(product, quantity = 1) {
      if (!this.isAuthenticated) {
        alert('로그인 먼저 하세용^_^');
        this.$router.push('/sign-in');
        return;
      }
      const token = JSON.parse(localStorage.getItem('userInfo')); //localStorage에 userInfo에 매핑되어있는 token을 가져옴(redis key)
      axios.post('http://localhost:7777/cart/validate', token).then((res) => {
        if (res.data) {
          console.log('인증된 사용자 입니다.');
          const cartKey = `cart_${res.data}`;
          let cart = localStorage.getItem(cartKey);

          if (!cart) {
            cart = [];
          } else {
            cart = JSON.parse(cart);
          }

          const existingCartItem = cart.find(
            (item) => item.product_id === product.productId
          );

          if (existingCartItem) {
            existingCartItem.quantity += quantity;
          } else {
            cart.push({ product_id: product.productId,
              name: product.name,
              image: product.firstPhoto ? this.getImagePath(product.firstPhoto) : '',
              price: product.price,
              quantity: quantity });
          }

          localStorage.setItem(cartKey, JSON.stringify(cart));
          console.log('Cart:', cart);
          alert("장바구니에 추가되었습니다!")
        }
      });
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
