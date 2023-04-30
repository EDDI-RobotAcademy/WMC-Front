import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/review/reviewStates";
import mutations from "@/store/review/mutations";
import actions from "@/store/review/actions";


Vue.use(Vuex)

const ReviewModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default  ReviewModule