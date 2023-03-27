<template>
  <div class="main-container">
  <v-container>
    <v-row >
      <v-col class="pt-0px"
        v-for="(product, index) in products"
        :key="product.productId"
        cols="8"
        sm="3"
        md="3"
        >
          <v-card >
          <v-img
            :src="product.firstPhoto ? getImagePath(product.firstPhoto) : ''"
            aspect-ratio="1"
            class="grey lighten-3"
            ></v-img>
            
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-actions>
              
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
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
    console.log('products:', this.products);
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
.container {
  max-width: 100%;
  min-width:0%;
  padding: 12px;
  margin:0px;
}

.main-container {
  max-width: 100%;
  padding: 0px;
  margin:0;
}

</style>
