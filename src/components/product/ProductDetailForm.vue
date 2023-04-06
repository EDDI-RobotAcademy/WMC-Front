<template>
  <v-row>
    <v-col cols="12" sm="6" md="6">
      <div v-if="product">
        <v-img
          v-for="(image, index) in product.imageDataList"
          :key="index"
          :src="getImagePath(image.imageData)"
          :alt="'Image ' + index"
          class="mini-image"
          @mouseover="changeMainImage(getImagePath(image.imageData))"
        ></v-img>
        <v-img :src="mainImage" :alt="'Main Image'" class="main-image"></v-img>
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="6" v-if="product">
      <v-card flat>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ product.description }}</v-card-text>
        <v-divider></v-divider>
        <v-card-subtitle>{{ product.price }}₩</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>{{ stockStatus }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn small color="primary" outlined>Like</v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="secondary" @click="addToCart(product)"
            >Add to Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      mainImage: this.product
        ? this.getImagePath(this.product.imageDataList[0].imageData)
        : '',
      memberId: localStorage.getItem('memberId'),
      authorityName: localStorage.getItem('authorityName'),
      cart: [],
    };
  },
  computed: {
    ...mapState(['isAuthenticated']),
    stockStatus() {
      if (this.product.stock === 0) {
        return 'Out of stock';
      } else if (this.product.stock < 10) {
        return 'Running out of stock';
      } else {
        return '';
      }
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
    getImagePath(imageData) {
      return require(`@/${imageData}`);
    },
    changeMainImage(image) {
      this.mainImage = image;
    },
    addToCart(product, quantity = 1) {
      if (!this.isAuthenticated) {
        alert('로그인 먼저 하세용^_^');
        this.$router.push('/sign-in');
        return;
      }

      if (this.memberId && this.authorityName) {
        const cartKey = `cart_${this.memberId}`;
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
          cart.push({
            product_id: product.productId,
            name: product.name,
            image: product.imageDataList[0].imageData
              ? this.getImagePath(product.imageDataList[0].imageData)
              : '',
            price: product.price,
            quantity,
          });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        console.log('Cart:', cart);
        alert('장바구니에 추가되었습니다!');
      } else {
        console.log('not added');
        console.log(this.memberId);
        console.log(this.authorityName);
      }
    },
    getImagePath(imageData) {
      return require(`@/${imageData}`);
    },
  },
};
</script>

<style scoped>
.mini-image {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.main-image {
  width: 300px;
  height: 300px;
  margin-top: 1rem;
}
</style>
