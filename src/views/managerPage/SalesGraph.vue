<template>
  <div>
    <h1>상품별 판매 추이</h1>
    <br /><br />
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import BarChart from '@/components/managerPage/BarChart';
import mainRequest from "@/api/mainRequest";


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
  async created() {
    const response = await mainRequest.get(
      '/manager/sales-data'
    );
    const mostSoldProducts = response.data;

    const labels = mostSoldProducts.map((product) => product.name);
    const soldData = mostSoldProducts.map((product) => product.sold);
    const stockData = mostSoldProducts.map((product) => product.stock);

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
    };
  },
};
</script>
