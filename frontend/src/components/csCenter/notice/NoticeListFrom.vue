<template>
  <div>
    <h3>공지사항 목록</h3>
    <table>
      <tr>
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
          <router-link :to="{ name: 'NoticeReadPage',
                            params: { noticeId: notice.noticeId.toString() }}">
            {{ notice.title }}
          </router-link>
        </td>
        <td align="right">
          {{ notice.writer }}
        </td>
        <td align="center">
          {{ notice.regDate }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
    name: "NoticeList",
    props: {
        notices: {
            type: Array
        }
    }
}

</script>

<style>

</style>