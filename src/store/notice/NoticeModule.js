import Vue from 'vue'
import Vuex from 'vuex'

import noticeStates from "@/store/notice/noticeStates";
import mutations from "@/store/notice/mutations";
import actions from "@/store/notice/actions";

Vue.use(Vuex)

const NoticeModule = {
    namespaced: true,
    noticeStates,
    state,
    actions,
    mutations,
}

export default NoticeModule