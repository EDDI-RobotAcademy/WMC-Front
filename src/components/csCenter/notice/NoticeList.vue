<template>
  <div style="border-bottom: 1px dotted lightgray;">
    <h3></h3>
    <table>
      <tr height="40">
        <th align="center" width="100">No</th>
        <th align="center" width="640">제목</th>
        <th align="center" width="150">작성자</th>
        <th align="center" width="300">등록일자</th>
      </tr>
      <tr v-if="!notices || (Array.isArray(notices) && notices.length === 0)">
        <td colspan="4">
          현재 등록된 공지사항이 없습니다!
        </td>
      </tr>
      <tr v-else v-for="notice in paginatedNotices" :key="notice.noticeId">
        <td align="center">
          {{ notice.noticeId }}
        </td>
        <td align="left">
          <router-link :to="{ name: 'NoticeReadPage', params: { noticeId: notice.noticeId.toString() } }">
            {{ notice.title }}
          </router-link>
        </td>
        <td align="center">
          {{ notice.writer }}
        </td>
        <td align="center">
          {{ new Date(notice.regDate).toLocaleDateString('ko-KR', {
            year: 'numeric', month: '2-digit', day: '2-digit'
          }).replace(/\./g, '') }}
        </td>
      </tr>
    </table>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }" @click="goToPage(page)">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div>
  </div>
</template>

<script>


export default {
  name: 'NoticeList',
  props: {
    notices: {
      type: Array
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 3, //숫자 바꿔서 list 개수 조절
    };
  },
  computed: {
    paginatedNotices() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      return this.notices.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.notices.length / this.pageSize);
      }
    },
    methods: {
      goToPage(page) {
        this.currentPage = page;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  }
}

</script>

<style scoped>
h3 {
  border-bottom: 3px solid black;
  margin-bottom: 10px;
}

tr:not(:first-child) {
  border-top: 1px dotted lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

button.active {
  background-color: #ccc;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
