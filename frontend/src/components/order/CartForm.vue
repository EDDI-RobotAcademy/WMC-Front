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
              <v-checkbox v-model="item.selected"></v-checkbox>
            </td>
            <td>
              <v-img
                :src="item.image"
                alt="Product image"
                max-width="50"
                max-height="50"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>
              <v-text-field
                type="number"
                min="1"
                v-model.number="item.quantity"
                single-line
                hide-details
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
    <v-btn color="grey" class="mr-3">Order All</v-btn>
    <v-btn color="grey">Order Partly</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAll: false,
      cartItems: [
        {
          name: 'Item 1',
          quantity: 1,
          price: 100,
          selected: false,
          image: 'https://via.placeholder.com/50',
        },
        {
          name: 'Item 2',
          quantity: 2,
          price: 150,
          selected: false,
          image: 'https://via.placeholder.com/50',
        },
        {
          name: 'Item 3',
          quantity: 3,
          price: 200,
          selected: false,
          image: 'https://via.placeholder.com/50',
        },
      ],
      shippingFee: 50,
    };
  },
  computed: {
    sum() {
      return this.cartItems.reduce(
        (acc, item) => acc + (item.selected ? item.quantity * item.price : 0),
        0
      );
    },
  },
  methods: {
    toggleAllItems() {
      this.cartItems.forEach((item) => (item.selected = this.selectAll));
    },
    removeSelectedItems() {
      this.cartItems = this.cartItems.filter((item) => !item.selected);
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
