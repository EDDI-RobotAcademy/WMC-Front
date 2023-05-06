<!-- <template>
  <my-order-form v-if="orderList.length > 0" :orders="orderList"/>
</template>

<script>
import mainRequest from '@/api/mainRequest';
import MyOrderForm from '@/components/myPage/MyOrderForm.vue';
export default {
    name: 'MyOrderList',
    components: {
        MyOrderForm,
    },
    data() {
        return {
            orderList: [],
        };
    },
    async created() {
        const token = JSON.parse(localStorage.getItem('userInfo'));

        const response = await mainRequest.post('/order/list', token);
        this.orderList = response.data;
    }
}
</script>

<style>

</style> -->