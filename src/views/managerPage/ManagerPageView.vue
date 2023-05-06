<template>
  <div style="margin-top: 100px">
    <div style="display: flex; padding: 30px">
      <manager-page-tab
        style="flex-basis: 20%"
        @tab-changed="currentTab = $event"
      />
      <div style="flex-basis: 80%">
        <component :is="currentTab" />
      </div>
    </div>
  </div>
</template>

<script>
import ManagerPageForm from '@/components/managerPage/ManagerPageForm.vue';
import ManagerPageTab from '@/components/managerPage/ManagerPageTab.vue';
import SalesGraph from '@/views/managerPage/SalesGraph.vue';
import OrderList from '@/views/managerPage/OrderList.vue';

import { mapActions } from 'vuex';

const memberModule = 'memberModule';

export default {
  name: 'ManagerPageView',
  components: {
    ManagerPageForm,
    ManagerPageTab,
    SalesGraph,
    OrderList,
    // BarChart,
  },
  data() {
    return {
      currentTab: 'SalesGraph',
    };
  },
};
</script>
