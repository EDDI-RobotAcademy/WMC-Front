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
          <div ref="contentEditable" contentEditable="true" v-html="content" class="mb-5 notice-textarea"></div>
        </td>
      </tr>
      <tr>
        <td>기존 이미지</td>
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
  created() {
    this.addImagesToContent();
  },
  methods: {
    onSubmit() {
      const { title, writer, files } = this;
      const content = this.$refs.contentEditable.innerHTML;
      this.$emit("submit", { title, writer, content, files });
    },
    updateContent() {
      this.content = this.$refs.contentEditable.innerHTML;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = e => {
            const imgTag = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; display: block; margin: 10px 0;">`;
            this.$refs.contentEditable.innerHTML += imgTag;
            this.updateContent();
          };
          reader.readAsDataURL(file);
        }
      }
    },
    getImagePath(imageData) {
      return require(`@/${imageData}`);
    },
    addImagesToContent() {
      if (this.notice.images) {
        const imagesHtml = this.notice.images
          .map(image => {
            const imagePath = this.getImagePath(image.noticeImageData);
            return `<img src="${imagePath}" alt="Notice Image" style="max-width: 100%; display: block; margin: 10px 0;">`;
          })
          .join('');
        this.content += imagesHtml;
      }
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

.notice-textarea {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  min-height: 500px;
  min-width: 600px;
  overflow-y: auto;
  resize: vertical;
}
</style>
