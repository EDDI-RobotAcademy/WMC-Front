<template>
  <div style="margin-top: 100px;">
    <div style="display: flex; padding:30px;">
      <my-page-tab style="flex-basis: 20%;"/>
      <my-page-form style="flex-basis: 80%;"/>
    </div>
  </div>
</template>

<script>
import MyPageForm from '@/components/myPage/MyPageForm';
import MyPageTab from '@/components/myPage/MyPageTab';
import { mapActions } from 'vuex';

const memberModule = 'memberModule';

export default {
  name: 'MyPageView',
  components: {
    MyPageForm,
    MyPageTab,
  },

  mounted() {
    this.requestMemberInfo();
    
  },
  methods: {
    ...mapActions(memberModule, ['requestMemberInfo']),
  },
};
</script>
