<template>
    <div class="shopping-cart">
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quantity, itemId) in items" :key="itemId">
            <td>{{ itemId }}</td>
            <td>{{ quantity }}</td>
            <td>
              <button @click="updateItemQuantity(itemId, quantity - 1)">-</button>
              <button @click="updateItemQuantity(itemId, quantity + 1)">+</button>
              <button @click="removeItem(itemId)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: "your_user_id", // Replace this with the actual user ID
        items: {},
      };
    },
    methods: {
      async fetchBasketItems() {
        try {
          const response = await fetch(`/basket/items?userId=${this.userId}`);
          const data = await response.json();
          this.items = data;
        } catch (error) {
          console.error("Error fetching basket items:", error);
        }
      },
      async updateItemQuantity(itemId, newQuantity) {
        if (newQuantity < 0) return;
  
        try {
          await fetch(`/basket/update?userId=${this.userId}&itemId=${itemId}&quantity=${newQuantity}`, {
            method: "POST",
          });
          this.items[itemId] = newQuantity;
        } catch (error) {
          console.error("Error updating item quantity:", error);
        }
      },
      async removeItem(itemId) {
        try {
          await fetch(`/basket/remove?userId=${this.userId}&itemId=${itemId}`, {
            method: "POST",
          });
          delete this.items[itemId];
        } catch (error) {
          console.error("Error removing item from basket:", error);
        }
      },
    },
    mounted() {
      this.fetchBasketItems();
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  