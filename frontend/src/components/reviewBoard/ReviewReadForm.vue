<template>
  <div>
    <table>
      <tr>
        <td>게시물 번호</td>
        <td>
          <input type="text" :value="review.reviewId" readonly/>
        </td>
      </tr>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" :value="review.title" readonly/>
        </td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>
          <input type="text" :value="review.writer" readonly/>
        </td>
      </tr>
      <tr>
        <td>등록일자</td>
        <td>
          <input type="text" :value="review.regDate" readonly/>
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="20" :value="review.content" readonly/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name: "ReviewReadForm",
    props: {
        review: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>

</style>