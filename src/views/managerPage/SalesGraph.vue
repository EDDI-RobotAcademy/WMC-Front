<template>
  <div>
    <h1>상품별 판매 추이</h1>
    <br /><br />
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
    <!-- <bar-chart :data="chartData" :options="chartOptions"></bar-chart> -->
    <br /><br />
    <div>
      <h3>Total Sales: {{ formatNumber(totalSales) }}</h3>
      <h3>Total Earnings: {{ formatNumber(totalEarnings) }}원</h3>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/managerPage/BarChart';
import mainRequest from '@/api/mainRequest';

export default {
  name: 'SalesGraph',
  components: {
    BarChart,
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              fontSize: 14,
            },
          },
          y: {
            ticks: {
              fontSize: 14,
              beginAtZero: true,
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        },
      },
    };
  },
  methods: {
    formatNumber(number) {
      return number.toLocaleString('en-US');
    },
  },

  async created() {
    const response = await mainRequest.get('/manager/sales-data');
    const mostSoldProducts = response.data;

    const labels = mostSoldProducts.map((product) => product.name);
    const soldData = mostSoldProducts.map((product) => product.sold);
    const stockData = mostSoldProducts.map((product) => product.stock);
    const priceData = mostSoldProducts.map((product) => product.price);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#4285f4',
          data: soldData,
        },
        {
          label: 'Stock',
          backgroundColor: 'green',
          data: stockData,
        },
      ],
      priceData,
    };
  },
  computed: {
    totalSales() {
      if (this.chartData.datasets && this.chartData.datasets.length > 0) {
        return this.chartData.datasets[0].data.reduce((a, b) => a + b, 0);
      }
      return 0;
    },
    totalEarnings() {
      if (
        this.chartData.datasets &&
        this.chartData.datasets.length > 0 &&
        this.chartData.priceData
      ) {
        return this.chartData.datasets[0].data.reduce((total, sales, index) => {
          return total + sales * this.chartData.priceData[index];
        }, 0);
      }
      return 0;
    },
  },
};
</script>
