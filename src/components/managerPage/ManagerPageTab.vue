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
  name: 'ManagerPageTab',
  props: {
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active_tab: 0,
      currentTab: 'SalesGraph',
      navi: [
        { menu: '판매현황', tab: 'SalesGraph' },
        { menu: "회원정보수정", tab: "MyPageForm" },
        // { menu: "상품관리", tab: "ProductList" },
        // { menu: "주문관리", tab: "OrderList" },
        // { menu: "리뷰관리", tab: "ReviewList" },
      ],
    };
  },
  mounted() {
    this.active_tab = this.index;
    console.log('navi : ' + this.currentTab);
  },
  watch: {
    chartData: {
      handler(newChartData, oldChartData) {
        if (newChartData !== oldChartData) {
          this.renderChart(newChartData, this.options);
        }
      },
      deep: true,
    },
  },

  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>
