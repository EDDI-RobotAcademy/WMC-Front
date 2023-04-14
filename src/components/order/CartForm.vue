<template>
  <div>
    <h3>Cart</h3>
    <div class="remove-btn">
      <v-btn @click="removeSelectedItems">Remove Selected Items</v-btn>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>
              <v-checkbox
                v-model="selectAll"
                @change="toggleAllItems"
              ></v-checkbox>
            </th>
            <th>Image</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
              <v-checkbox
                v-model="item.selected"
                @change="updateSum"
              ></v-checkbox>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'ProductDetailPage',
                  params: { productId: item.productId },
                }"
                tag="div"
              >
                <v-img
                  :src="item.image"
                  alt="Product image"
                  max-width="50"
                  max-height="50"
                />
              </router-link>
            </td>
            <td>{{ item.name }}</td>
            <td>
              <v-text-field
                type="number"
                min="1"
                v-model.number="item.quantity"
                single-line
                hide-details
                @input="updateSum"
              ></v-text-field>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.price * item.quantity }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="total-info">
      <p>Sum: {{ sum }}</p>
      <p>Shipping fee: {{ shippingFee }}</p>
      <p>Total: {{ sum + shippingFee }}</p>
    </div>

    <!-- <v-btn color="grey" class="mr-3">Order All</v-btn>
    <v-btn color="grey">Order Partly</v-btn> -->
    <v-btn icon @click="KakaoPay">
      <v-img :src="require('/public/kakaopay/payment_icon_yellow_small.png')" />
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      cartItems: [],
      selectAll: false,
      shippingFee: 50,
      sum: 0,
    };
  },
  created() {
    const token = JSON.parse(localStorage.getItem('userInfo'));
    axios.post('http://localhost:7777/cart/validate', token).then((res) => {
      if (res.data) {
        console.log('인증된 사용자 입니다.');
        const [memberId, authorityName] = res.data.split(':');
        console.log(memberId);
        console.log(authorityName);
        const cartKey = `cart_${memberId}`;
        const cartItems = localStorage.getItem(cartKey)
          ? JSON.parse(localStorage.getItem(cartKey))
          : [];
        this.cartItems = cartItems;
      }
    });
  },

  watch: {
    cartItems: {
      deep: true,
      handler() {
        this.updateSum();
      },
    },
  },

  methods: {
    async KakaoPay() {
      try {
        const selectedItems = this.cartItems.filter((item) => item.selected);
        const orderItems = selectedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        const requestBody = {
          orderItems: orderItems,
          token: JSON.parse(localStorage.getItem('userInfo')),
        };
        const response = await axios.post(
          'http://localhost:7777/order/kakaoPay',
          requestBody
        );
        console.log(response.data);
        const box = response.data.next_redirect_pc_url;
        window.open(box);
        this.removeSelectedItems();
      } catch (error) {
        console.error('Error processing KakaoPay:', error);
      }
    },

    toggleAllItems() {
      this.cartItems.forEach((item) => (item.selected = this.selectAll));
      this.updateSum();
    },
    removeSelectedItems() {
      this.cartItems = this.cartItems.filter((item) => !item.selected);

      const memberId = localStorage.getItem('memberId');
      if (memberId) {
        console.log('인증된 사용자 입니다.');
        const cartKey = `cart_${memberId}`;
        localStorage.setItem(cartKey, JSON.stringify(this.cartItems));
      }
    },

    updateSum() {
      this.sum = this.cartItems.reduce(
        (acc, item) => acc + (item.selected ? item.quantity * item.price : 0),
        0
      );
    },
  },
};
</script>

<style scoped>
.total-info {
  margin-top: 1rem;
}
.remove-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
