import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/product/productStates";
import mutations from "@/store/product/mutations";
import actions from "@/store/product/actions";


Vue.use(Vuex)

const ProductModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default ProductModule