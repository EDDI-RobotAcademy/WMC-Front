<template>
    <div style="margin-top: 100px;">
      <div style="display: flex; padding:30px;">
        <manager-page-tab style="flex-basis: 20%;"/>
        <manager-page-form style="flex-basis: 80%;"/>
      </div>
    </div>
  </template>
  
  <script>
  import ManagerPageForm from '@/components/managerPage/ManagerPageForm.vue';
  import ManagerPageTab from '@/components/managerPage/ManagerPageTab.vue';
  import { mapActions } from 'vuex';
  
  const memberModule = 'memberModule';
  
  export default {
    name: 'ManagerPageView',
    components: {
        ManagerPageForm,
        ManagerPageTab,
    },
  
    // mounted() {
    //   this.requestMemberInfo();
      
    // },
    // methods: {
    //   ...mapActions(memberModule, ['requestMemberInfo']),
    // },
  };
  </script>
  