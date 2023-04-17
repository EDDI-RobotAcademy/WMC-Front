<template>
    <v-container>
      <v-tabs
        v-model="active_tab"
        fixed-tabs
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
  
      <keep-alive>
        <component :is="componentLoader"></component>
      </keep-alive>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "ManagerPageTab",
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
        
        active_tab: 0,
        navi: [
          { menu: "판매현황", tab: "CartForm" },
          { menu: "회원정보수정", tab: "MyPageForm" },
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
        return () => import(`@/components/mypage/${tab}`);
      },
    },
    methods: {},
  };
  </script>