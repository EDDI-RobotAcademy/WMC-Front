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
          <div ref="contentEditable" contentEditable="true" class="mb-5 notice-textarea" @input="updateContent"></div>
        </td>
      </tr>
      <tr>
        <td>파일 업로드</td>
        <td>
          <input type="file" id="file" multiple show-size @change="handleFileUpload($event)" class="mb-5" />
        </td>
      </tr>
    </table>
  </form>
</template>

<script>

export default {
  name: "NoticeRegisterForm",
  data() {
    return {
      title: '제목을 입력하세요.',
      writer: 'WMC',
      content: '내용을 입력하세요.',
      files: [],
    }
  },
  methods: {
    onSubmit() {
      const { title, writer, content, files } = this
      this.$emit('submit', { title, writer, content, files })

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
  }
}

</script>

<style scoped>
table {
  margin: 0 auto;
}

.notice-input {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.notice-textarea {
  width: 100%;
  padding: 5px;
  font-size: 16px;
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
