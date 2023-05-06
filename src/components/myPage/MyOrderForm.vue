<template>
  <div>
    <h1>My Orders</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Address</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>            <v-img
              :src="order.photo ? getImagePath(order.photo) : ''"
              aspect-ratio=".8"
            ></v-img></td>
            <td>{{ order.productName }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ formatNumber(order.price / order.quantity) }}</td>
            <td>{{ formatNumber(order.price) }}</td>
            <td>{{ order.orderDate }}</td>
            <td>{{ order.address.street }}</td>
            <td>
              <review-create-dialog
                :order="order"
              ></review-create-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import ReviewCreateDialog from '@/components/review/ReviewCreateDialog.vue';
import mainRequest from '@/api/mainRequest';

export default {
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    const token = JSON.parse(localStorage.getItem('userInfo'));

    const response = await mainRequest.post('/order/list', token);
    this.orders = response.data;
  },
  components: {
    ReviewCreateDialog,
  },
  methods: {
    formatNumber(number) {
      return number.toLocaleString('en-US');
    },
    getImagePath(imageData) {
      return `https://wmc-s3-bucket.s3.ap-northeast-2.amazonaws.com/${imageData}`;
    },
  },
};
</script>

<style></style>
