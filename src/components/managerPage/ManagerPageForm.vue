<template>
    <div>
      <h2>asdf</h2>
      <!-- <sales-graph/> -->
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
import SalesGraph from '@/views/managerPage/SalesGraph.vue';
  const memberModule = 'memberModule';
  
  export default {
  components: { SalesGraph },
    name: 'MagagerPageForm',
  };
  </script>
  
  <style scoped>
  
  .container {
    display: flex;
    justify-content: center;
  }
  .mypage-card{
    
    width:50%;
  }
  
  </style>
  