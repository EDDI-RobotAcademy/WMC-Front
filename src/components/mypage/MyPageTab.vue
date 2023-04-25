<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-tabs
          v-model="active_tab"
          background-color="white"
          color="#205C37"
          vertical
        >  
          <v-tab
            :key="i"
            v-for="(item, i) in navi"
            v-on:click="currentTab = item.tab"
          >
            {{ item.menu }}
          </v-tab>
        </v-tabs>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MyPageTab",
  props: {
    name: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentTab: "MyPageForm",
      active_tab: 0,
      navi: [
        { menu: "회원정보", tab: "MyPageForm" },
        { menu: "찜한상품", tab: "CartForm" },
      ],
    };
  },
  mounted() {
    this.active_tab = this.index;
    console.log("navi : " + this.currentTab);
  },
  computed: {
    componentLoader() {
      const tab = this.currentTab;
      return () => import(`@/components/myPage/${tab}`);
    },
  },
  methods: {},
};
</script>

