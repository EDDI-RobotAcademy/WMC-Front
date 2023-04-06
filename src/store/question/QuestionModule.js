import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/question/questionStates";
import mutations from "@/store/question/mutations";
import actions from "@/store/question/actions";

Vue.use(Vuex)

const QuestionModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default QuestionModule