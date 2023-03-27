import {
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_MAIN_PRODUCT_LIST_TO_SPRING,
    
    REQUEST_NOTICE_LIST_TO_SPRING,
} from './mutation-types'



export default {
    [REQUEST_PRODUCT_LIST_TO_SPRING](state, passingData) {
        if (!passingData) {
          console.error('The data passed to REQUEST_PRODUCT_LIST_TO_SPRING mutation is undefined');
          return;
        }
      
        state.products = passingData.map(productResponse => ({
          ...productResponse,
          imageDataList: productResponse.imageDataList
        }));
      },
    [REQUEST_MAIN_PRODUCT_LIST_TO_SPRING](state, passingData) {
        if (!passingData) {
          console.error('The data passed to REQUEST_MAIN_PRODUCT_LIST_TO_SPRING mutation is undefined');
          return;
        }
      
        state.products = passingData.map(productResponse => ({
          ...productResponse,
          imageDataList: productResponse.imageDataList
        }));
      },


    [REQUEST_NOTICE_LIST_TO_SPRING] (state, passingData) {
        state.notices = passingData
    }
}