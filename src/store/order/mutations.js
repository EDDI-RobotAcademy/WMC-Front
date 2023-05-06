import {
  REQUEST_ORDER_LIST_TO_SPRING,
} from './mutation-types'

export default {
  [REQUEST_ORDER_LIST_TO_SPRING](state, passingData) {
    state.orders = passingData.mape(orderResponse => ({
      ...orderResponse,
      imageDataList: orderResponse.imageDataList
    }))
  }
}