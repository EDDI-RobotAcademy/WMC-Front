import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/order/orderStates";
import mutations from "@/store/order/mutations";
import actions from "@/store/order/actions";


Vue.use(Vuex)

const OrderModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default OrderModule