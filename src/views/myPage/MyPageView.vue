<template>
    <div style="margin-top: 100px">
      <div style="display: flex; padding: 30px">
        <my-page-tab
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
  //에러확인중
  import MyPageTab from '@/components/myPage/MyPageTab.vue';
  import MyPageForm from '@/components/myPage/MyPageForm.vue';
  import { mapActions } from 'vuex';
  
  const memberModule = 'memberModule';
  
  export default {
    name: 'MyPageView',
    components: {
      MyPageTab,
      MyPageForm,
    },
    data(){
      return{
        currentTab: 'MyPageForm'
      }
    },
  
    mounted() {
      this.requestMemberInfo();
      
    },
    methods: {
      ...mapActions(memberModule, ['requestMemberInfo']),
    },
  };
  </script>
  