<template>
  <div>
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import BarChart from '@/components/managerPage/BarChart';
import axios from 'axios';

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
              stepSize: 1, // This will show only integer ticks, removing the 0.5 values
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
  async created() {
    const response = await axios.get(
      'http://localhost:7777/manager/sales-data'
    );
    const mostSoldProducts = response.data;

    const labels = mostSoldProducts.map((product) => product.name);
    const data = mostSoldProducts.map((product) => product.sold);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#f87979',
          data,
        },
      ],
    };
  },
};
</script>
