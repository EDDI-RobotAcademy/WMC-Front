import { REQUEST_REVIEW_LIST_TO_SPRING } from './mutation-types';

import mainRequest from '@/api/mainRequest';

export default {
  requestCreateReviewToSpring({}, payload) {
    const { productId, token, rating, content, fileNames } = payload;

    const reviewData = {
      productId,
      token,
      rating,
      content,
      fileNames,
    };
    return mainRequest
      .post('/review/register', reviewData)
      .then(() => {
        alert('리뷰 등록 성공!');
      })
      .catch(() => {
        alert('문제 발생!');
      });
  },
  requestReviewListToSpring({ commit }) {
    console.log('requestReviewListToSpring()');
    return mainRequest.get('/review/list').then((res) => {
      commit(REQUEST_REVIEW_LIST_TO_SPRING, res.data);
    });
  },
};
