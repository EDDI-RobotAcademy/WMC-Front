<template>
  <form @submit.prevent="onSubmit" class="notice-form">
    <table>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" v-model="title" class="mt-5 notice-input"/>
        </td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>
          <input type="text" v-model="writer" class="mt-5 mb-5 notice-input"/>
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="20" v-model="content"  class="mb-5 notice-textarea"/>
        </td>
      </tr>
      <tr>
        <td>파일 업로드</td>
        <td>
          <input type="file" id="file" multiple show-size @change="handleFileUpload($event)" class="mb-5"/>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>

export default {
    name: "NoticeRegisterForm",
    data () {
        return {
            title: '제목을 입력하세요.',
            writer: 'WMC',
            content: '내용을 입력하세요.',
            files: [],
        }
    },
    methods: {
        onSubmit () {
            const { title, writer, content, files } = this
            this.$emit('submit', { title, writer, content, files })
            
        },
        handleFileUpload(event) {
          this.files = event.target.files;
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

.notice-button {
background-color: #428bca;
color: #fff;
padding: 5px 10px;
font-size: 16px;
border: none;
border-radius: 3px;
cursor: pointer;
}

</style>
