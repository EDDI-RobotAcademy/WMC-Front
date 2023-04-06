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
      <tr v-else v-for="notice in notices" :key="notice.noticeId">
        <td align="center">
          {{ notice.noticeId }}
        </td>
        <td align="left">
          <router-link :to="{ name: 'NoticeReadPage', params: { noticeId: notice.noticeId.toString() }}">
            {{ notice.title }}
          </router-link>
        </td>
        <td align="center">
          {{ notice.writer }}
        </td>
        <td align="center">
          {{ new Date(notice.regDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '') }}
        </td>
      </tr>
    </table>
  </div>

</template>

<script>


export default {
  name: 'NoticeList',
  props: {
    notices: {
      type: Array
    }
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

</style>
