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
            @click="$emit('tab-changed', item.tab)"
          >
            {{ item.menu }}
          </v-tab>
        </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: 'MyPageTab',
  props: {
    name: {
      type: String,
      default:'',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active_tab: 0,
      currentTab: 'MyPageForm',
      navi: [
        { menu: '회원정보', tab: 'MyPageForm' },
      
      ],
    };
  },
  mounted() {
    this.active_tab = this.index;
    console.log("navi : " + this.currentTab);
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

