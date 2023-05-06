import {
  REQUEST_ORDER_LIST_TO_SPRING,
} from './mutation-types';

import mainRequest from '@/api/mainRequest';

export default {
  requestOrderListToSpring({ commit }) {
    console.log('requestOrderListToSpring()');
    return mainRequest.get('/order/list').then((res) => {
      commit(REQUEST_ORDER_LIST_TO_SPRING, res.data);
    });
  }
};