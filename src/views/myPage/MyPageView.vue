<template>
  <div>
    <div>
      <my-page-tab/>
    </div>
  </div>
</template>

<script>
import MyPageTab from '@/components/myPage/MyPageTab';
import { mapActions } from 'vuex';

const memberModule = 'memberModule';

export default {
  name: 'MyPageView',
  components: {
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
