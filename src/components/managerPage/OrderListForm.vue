<template>
  <div>
    <h1>Order List</h1>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.address="{ item }">
        <td>{{ formattedAddress(item.address) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    orders: Array,
  },
  data() {
    return {
      headers: [
        { text: "Order ID", value: "orderId" },
        { text: "Product Name", value: "productName" },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Order Date", value: "orderDate" },
        { text: "Member Name", value: "memberName" },
        { text: "Address", value: "address" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Zipcode", value: "address.zipcode" },
      ],
    };
  },
  methods: {
    formattedAddress(address) {
      const street = address.street || "";
      const city = address.city || "";
      const addressDetail = address.addressDetail || "";

      return `${street}, ${addressDetail}, ${city}`.trim();
    },
  },
};
</script>

<style>
</style>
