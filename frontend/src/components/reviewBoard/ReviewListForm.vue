<template>
  <div>
    <h3>게시물 목록</h3>
    <table>
      <tr>
        <th align="center" width="100">No</th>
        <th align="center" width="640">제목</th>
        <th align="center" width="150">작성자</th>
        <th align="center" width="300">등록일자</th>
      </tr>
      <tr v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
        <td colspan="4">
            현재 등록된 게시물이 없습니다!
        </td>
      </tr>
      <tr v-else v-for="review in reviews" :key="review.reviewId">
        <td align="center">
          {{ review.reviewId }}
        </td>
        <td align="left">
          <router-link :to="{ name: 'ReviewReadPage',
                            params: { reviewId: review.reviewId.toString() }}">
            {{ review.title }}
          </router-link>
        </td>
        <td align="right">
          {{ review.writer }}
        </td>
        <td align="center">
          {{ review.regDate }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
    name: "reviewListForm",
    props: {
        reviews: {
            type: Array
        }
    }
}

</script>

<style>

</style>