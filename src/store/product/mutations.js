import {
  REQUEST_PRODUCT_LIST_TO_SPRING,
  REQUEST_PRODUCT_ITEM_LIST_TO_SPRING,
  REQUEST_MAIN_PRODUCT_LIST_TO_SPRING,
  REQUEST_PRODUCT_LIST_BY_CATEGORY,
  REQUEST_MOST_SOLD_PRODUCT_LIST,
  REQUEST_SEARCH_RESULTS,
} from './mutation-types'

export default {
  [REQUEST_PRODUCT_LIST_TO_SPRING] (state, passingData) {
    if (!passingData) {
      console.error('The data passed to REQUEST_PRODUCT_LIST_TO_SPRING mutation is undefined')
      return
    }

    state.products = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },
  [REQUEST_PRODUCT_ITEM_LIST_TO_SPRING] (state, passingData) {
    if (!passingData) {
      console.error('The data passed to REQUEST_PRODUCT_ITEM_LIST_TO_SPRING mutation is undefined')
      return
    }

    state.products = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },
  [REQUEST_MAIN_PRODUCT_LIST_TO_SPRING] (state, passingData) {
    if (!passingData) {
      console.error('The data passed to REQUEST_MAIN_PRODUCT_LIST_TO_SPRING mutation is undefined')
      return
    }

    state.products = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },
  [REQUEST_PRODUCT_LIST_BY_CATEGORY] (state, passingData) {
    if (!passingData) {
      console.error('The data passed to REQUEST_PRODUCT_LIST_BY_CATEGORY mutation is undefined')
      return
    }

    state.products = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },
  [REQUEST_MOST_SOLD_PRODUCT_LIST] (state, passingData) {
    if (!passingData) {
      console.error('REQUEST_MOST_SOLD_PRODUCT_LIST IS UNDEFINED')
      return
    }

    state.mostSoldProducts = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },
  [REQUEST_SEARCH_RESULTS] (state, passingData) {
    if (!passingData) {
      console.error('REQUEST_MOST_SOLD_PRODUCT_LIST IS UNDEFINED')
      return
    }

    state.searchResults = passingData.map(productResponse => ({
      ...productResponse,
      imageDataList: productResponse.imageDataList
    }))
  },

}
