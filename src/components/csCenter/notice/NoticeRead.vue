<template>
  <v-card class="mx-auto" max-width="800" title="Notice Details">
    <v-container>

      <v-text-field class="title-text" color="primary" variant="underlined" :value="notice.title"
        :readonly="true"></v-text-field>


      <v-row>
        <v-col cols="7">
          <v-text-field color="primary" variant="underlined" :value="notice.writer" :readonly="true"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="7">
          <v-text-field color="primary" variant="underlined" :value="formattedDate" :readonly="true"></v-text-field>
        </v-col>
      </v-row>

      <div class="content-area" contentEditable="false" ref="contentEditable" v-html="noticeContentWithImages"></div>

      <!--v-row>
        <v-col v-for="(image, index) in notice.images" :key="index" cols="12" md="6">
          <v-img :src="getImagePath(image.noticeImageData)" max-height="400"></v-img>
        </v-col>
      </v-row>

      


      <v-textarea color="primary" :value="notice.content" :readonly="true"></v-textarea-->
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
  },

  computed: {
    formattedDate() {
      const date = new Date(this.notice.regDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year} ${month} ${day}`;
    },
    noticeContentWithImages() {
  let contentWithImages = this.notice.content;

  if (this.notice.images) {
    this.notice.images.forEach((image, index) => {
      const imagePath = this.getImagePath(image.noticeImageData);
      const imgTag = `<img src="${imagePath}" alt="Image ${index}" style="max-height: 400px; max-width: 100%; display: block; margin: 10px 0;">`;
      contentWithImages += imgTag;
    });
  }
  
  return contentWithImages;
}
  },
  methods: {
    getImagePath(imageData) {
      console.log('imageData:', imageData)
      return require(`@/${imageData}`)
    }
  },
  created() {
    console.log("Notice data:", this.notice);
  }
}

</script>
  
<style>
.title-text {
  font-size: 24px;
  font-weight: bold;
}

.content-area {
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  padding: 8px;
  overflow-y: auto;
  resize: vertical;
  max-height: 500px;
}
</style>