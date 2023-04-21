import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/member/memberStates";
import mutations from "@/store/member/mutations";
import actions from "@/store/member/actions";

Vue.use(Vuex)

const MemberModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default MemberModule