import {
    REQUEST_REVIEW_LIST_TO_SPRING,
} from './mutation-types'

export default {
  [REQUEST_REVIEW_LIST_TO_SPRING](state, passingData) {
    state.reviews = passingData
  },
  // [REQUEST_PRODUCT_ITEM_LIST_TO_SPRING] (state, passingData) {
  //   if (!passingData) {
  //     console.error('The data passed to REQUEST_PRODUCT_ITEM_LIST_TO_SPRING mutation is undefined')
  //     return
  //   }

  //   state.products = passingData.map(productResponse => ({
  //     ...productResponse,
  //     imageDataList: productResponse.imageDataList
  //   }))
  // },
  
}
