<template>
  <v-container>
    <div>
      <h3></h3>
      <table>
        <tr style="font-size: 19px;">
          <th align="center" width="100">No</th>
          <th align="center" width="640">제목</th>
          <th align="center" width="150">작성자</th>
          <th align="center" width="300">등록일자</th>
        </tr>
        <tr v-for="notice in paginatedNotices" :key="notice.noticeId">
          <template v-if="!notices || (Array.isArray(notices) && notices.length === 0)">
            <td colspan="4">
              현재 등록된 공지사항이 없습니다!
            </td>
          </template>
          <template v-else>
            <td align="center">
              {{ notice.noticeId }}
            </td>
            <td align="center">
              <router-link class="no_underline"
                :to="{ name: 'NoticeReadPage', params: { noticeId: notice.noticeId.toString() } }">
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
          </template>
        </tr>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
        <button v-for="page in visiblePages" :key="page" :class="{ active: currentPage === page }"
          @click="goToPage(page)">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
      </div>
    </div>
  </v-container>
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
      pageSize: 5, //숫자 바꿔서 list 개수 조절
      maxVisibleButtons: 5, // 한 번에 보여질 최대 페이지 버튼 수 설정
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
    },

    visiblePages() {
      const startPage = Math.floor((this.currentPage - 1) / this.maxVisibleButtons) * this.maxVisibleButtons + 1;
      const endPage = Math.min(startPage + this.maxVisibleButtons - 1, this.totalPages);

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        const firstVisiblePage = this.visiblePages[0];
        this.currentPage = Math.max(firstVisiblePage - 1, 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        const lastVisiblePage = this.visiblePages[this.visiblePages.length - 1];
        this.currentPage = Math.min(lastVisiblePage + 1, this.totalPages);
      }
    },
  }
}

</script>

<style scoped>
table {
  width: 100%;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin-bottom: 10px;
}

td:not(:last-child),
th:not(:last-child) {
  border-right: 1px solid lightgray;
}

tr {
  height: 70px;
}


tr:not(:first-child) {
  border-top: 1px solid lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
}

.no_underline {
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: transform 0.3s ease, color 0.3s ease, font-size 0.3s ease;
  /* color와 font-size 변경에 대한 전환 추가 */
}

.no_underline:hover {
  transform: scale(1.1);
  color: black;
  /* 마우스 오버 시 글자색 변경 */
  font-size: 17px;
  /* 마우스 오버 시 글자 크기 변경 */
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
  border: none;
}

button.active {
  background-color: #ccc;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
