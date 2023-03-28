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
    </table>
    <div>
      <button type="submit" class="mr-5 notice-button">등록</button>
      <router-link :to="{ name: 'NoticeListPage' }" class="notice-button">
        취소
      </router-link>
      
    </div>
  </form>
</template>

<script>

export default {
    name: "NoticeRegisterForm",
    data () {
        return {
            title: '제목을 입력하세요.',
            writer: 'WMC',
            content: '내용을 입력하세요.'
        }
    },
    methods: {
        onSubmit () {
            const { title, writer, content } = this
            this.$emit('submit', { title, writer, content })
        }
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