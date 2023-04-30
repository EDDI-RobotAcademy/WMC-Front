import {
  REQUEST_REVIEW_LIST_TO_SPRING,
} from'./mutation-types'

import mainRequest from "@/api/mainRequest";

export default {
  requestCreateReviewToSpring({}, payload) {
    const { productName, productCategory, writer, rating, content, files } = payload;

    const reviewData = {
      productName,
      productCategory,
      writer,
      rating,
      content,
      files,
    };
    return mainRequest
      .post('/review/register', payload)
      .then(() => {
        alert('리뷰 등록 성공!');
      })
      .catch(() => {
        alert('문제 발생!');
      });
  },
  requestReviewListToSpring ({ commit }) {
    console.log('requestReviewListToSpring()')
    return mainRequest.get('/review/list')
        .then((res) => {
            commit(REQUEST_REVIEW_LIST_TO_SPRING, res.data)
        })
},
 
}
