<template>
  <v-container>
    <v-row>
      <v-col>
        <router-link to="/product-register-page">
          <v-btn v-if="authorityName === 'MANAGER'" color="#a1887f" outlined
            >상품 등록 하러가기</v-btn
          >
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
  </v-container>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'

export default {
  name: 'ProductList',
  components: {
    Carousel,
    Slide
  },
  props: {
    products: {
      type: Array
    }
  },
  data () {
    return {
      memberId: localStorage.getItem('memberId'),
      authorityName: localStorage.getItem('authorityName'),
      cart: []
    }
  },

  computed: {
    ...mapState(['isAuthenticated']),

    total () {
      let sum = 0
      for (const item of this.cart) {
        sum += item.price * item.quantity
      }
      return sum
    }
  },
  mounted () {
    if (localStorage.getItem('userInfo')) {
      this.$store.state.isAuthenticated = true
    } else {
      this.$store.state.isAuthenticated = false
    }
  },
  methods: {
    addToCart (product, quantity = 1) {
      if (!this.isAuthenticated) {
        alert('로그인 먼저 하세용^_^')
        this.$router.push('/sign-in')
        return
      }

      if (this.memberId && this.authorityName) {
        const cartKey = `cart_${this.memberId}`
        let cart = localStorage.getItem(cartKey)
        if (!cart) {
          cart = []
        } else {
          cart = JSON.parse(cart)
        }

        const existingCartItem = cart.find(
          (item) => item.product_id === product.productId
        )

        if (existingCartItem) {
          existingCartItem.quantity += quantity
        } else {
          cart.push({
            product_id: product.productId,
            name: product.name,
            image: product.firstPhoto
              ? this.getImagePath(product.firstPhoto)
              : '',
            price: product.price,
            quantity
          })
        }

        localStorage.setItem(cartKey, JSON.stringify(cart))
        console.log('Cart:', cart)
        alert('장바구니에 추가되었습니다!')
      }
    },
    getImagePath (imageData) {
      console.log('imageData:', imageData)
      return require(`@/${imageData}`)
    }
  }
}
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
