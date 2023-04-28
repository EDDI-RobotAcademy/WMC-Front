<template>
  <order-list-form :orders="orderList"/>
</template>

<script>
import OrderListForm from '@/components/managerPage/OrderListForm.vue';
import mainRequest from '@/api/mainRequest';
export default {
    name: 'OrderList',
    components: {
        OrderListForm,
    },
    data() {
        return {
            orderList: [],
        };
    },
    async created() {
        const token = JSON.parse(localStorage.getItem('userInfo'));

        const response = await mainRequest.post('/order/managerorderlist', token);
        this.orderList = response.data;
    }
}
</script>

<style>

</style>