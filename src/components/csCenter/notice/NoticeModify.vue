<template>
  <form @submit.prevent="onSubmit" class="notice-form">
    <table>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" v-model="title" class="mt-5 notice-input" />
        </td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>
          <input type="text" v-model="writer" class="mt-5 mb-5 notice-input" />
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="20" v-model="content" class="mb-5 notice-textarea" />
        </td>
      </tr>
      <tr>
        <td>이미지</td>
        <td>
          <div v-for="(image, index) in notice.images" :key="index" class="image-wrapper">
            <img :src="getImagePath(image.noticeImageData)" alt="Notice Image" class="notice-image" />
          </div>
        </td>
      </tr>
      <tr>
        <td>파일 업로드</td>
        <td>
          <input type="file" id="file" multiple show-size @change="handleFileUpload($event)" class="mb-5" />
        </td>
      </tr>
    </table>
    <div>
      <button type="submit" class="mr-5 notice-button">수정</button>
    </div>
  </form>
</template>


<script>
export default {
  name: "NoticeModify",
  props: {
    notice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.notice.title,
      writer: this.notice.writer,
      content: this.notice.content,
      files: [],
    };
  },
  methods: {
    onSubmit() {
      const { title, writer, content, files } = this;
      this.$emit("submit", { title, writer, content, files });
    },
    handleFileUpload(event) {
      this.files = event.target.files;
    },
    getImagePath(imageData) {
      console.log("imageData:", imageData);
      return require(`@/${imageData}`);
    },
  },
};
</script>

<style scoped>
.image-wrapper {
  display: inline-block;
  margin: 5px;
}

.notice-image {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.uploaded-image-wrapper {
  display: inline-block;
  margin: 5px;
}

.uploaded-image {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
