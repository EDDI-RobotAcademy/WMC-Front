<template>
  <v-card class="mx-auto" max-width="800" title="Notice Details">
    <v-container>

      <v-text-field class="title-text" color="primary" variant="underlined" :value="notice.title"
        :readonly="true"></v-text-field>

      <v-row>
        <v-col cols="6">
          <v-text-field color="primary" variant="underlined" :value="notice.writer" :readonly="true"></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field color="primary" variant="underlined" :value="formattedDate" :readonly="true"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="(image, index) in notice.images" :key="index" cols="12" md="12">
          <v-img :src="getImagePath(image.noticeImageData)" max-height="400"></v-img>
        </v-col>
      </v-row>


      <v-textarea color="primary" :value="notice.content" :readonly="true"></v-textarea>
    </v-container>
  </v-card>
</template>
  
<script>
export default {
  name: "NoticeRead",
  props: {
    notice: {
      type: Object,
      required: true,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    formattedDate() {
      const date = new Date(this.notice.regDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year} ${month} ${day}`;
    },
  },
  methods: {
    getImagePath(imageData) {
      console.log('imageData:', imageData)
      return `https://wmc-s3-bucket.s3.ap-northeast-2.amazonaws.com/${imageData}`;
    }
  },
}

</script>
  
<style scoped>
.title-text {
  font-size: 24px;
  font-weight: bold;
}
</style>