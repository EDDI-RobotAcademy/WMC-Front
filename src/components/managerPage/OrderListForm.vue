<template>
    <div>
      <h1>Order List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Member Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Zipcode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.orderDate }}</td>
            <td>{{ order.memberName }}</td>
            <!-- <td>{{ formattedAddress(order.address) }}</td> -->
            <td>{{ order.phoneNumber }}</td>
            <td>{{ order.zipcode }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>

export default {
    props: {
        orders: Array
    },
    methods: {
        formattedAddress(address) {
            const street = address.street || '';
            const city = address.city || '';
            const addressDetail = address.addressDetail || '';
            const zipcode = address.zipcode || '';

            return `${street}, ${addressDetail}, ${city}, ${zipcode}`.trim();
        }
    }
}
</script>

<style>

</style>