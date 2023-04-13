import Vue from "vue"
import Vuex from "vuex"
import axiosInst from "@/utility/axiosObject";

Vue.use(Vuex)

export default {
    name: 'MyPageForm',
    computed: {
      ...mapState(memberModule, ["member"]),
      isAuthenticated() {
        return this.$store.state.memberModule.isAuthenticated;
      },
    },
  
    async mounted() {
      if (this.isAuthenticated === true) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let memberId = userInfo.memberId;
  
        console.log("MyPageInfo" + memberId);
  
        
        await this.requestMyPageMemberInfo(memberId);
      }
    },
    methods: {
    ...mapActions(memberModule, ["requestMyPageMemberInfo"]),
    async requestMyPageMemberInfo(memberId) {
      await this.$store.dispatch("memberModule/requestMyPageMemberInfo", memberId);
    },
  },
}

export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {}}) {
    const mockGetters = Object.assign({}, getters, custom.getters)
    const mockMutations = Object.assign({}, mutations, custom.mutations)
    const mockActions = Object.assign({}, actions, custom.actions)
    const mockState = Object.assign({}, state, custom.state)

    return {
        getters: mockGetters,
        mutations: mockMutations,
        actions: mockActions,
        state: mockState,
        store: new Vuex.Store({
            getters: mockGetters,
            mutations: mockMutations,
            actions: mockActions,
            state: mockState,
        }),
    }
}

export const store = __createMocks().store;