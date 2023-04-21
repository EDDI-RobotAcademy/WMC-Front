<template>
  <div class="chart-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'BarChart',
  props: ['data', 'options'],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.$refs.chart, {
        type: 'bar',
        data: this.data,
        options: this.options,
      });
    },
  },
  watch: {
    data() {
      this.initChart();
    },
    options() {
      this.initChart();
    },
  },
};
</script>
<style scoped>
.chart-container {
  width: 100%; /* Adjust the width as needed */
  height: 300px; /* Adjust the height as needed */
}
</style>