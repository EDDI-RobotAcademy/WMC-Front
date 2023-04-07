import {
    REQUEST_NOTICE_LIST_TO_SPRING,
    REQUEST_NOTICE_TO_SPRING,
} from './mutation-types'

export default {

/*
      [REQUEST_NOTICE_LIST_TO_SPRING] (state, passingData) {
        if (!passingData) {
          console.error('The data passed to REQUEST_NOTICE_LIST_TO_SPRING mutation is undefined')
          return
        }
        state.notices = passingData//.map(Response => ({
         // ...notice,
          //ImageDataList: Response.ImageDataList
        ;
      },
    }
*/

    [REQUEST_NOTICE_LIST_TO_SPRING] (state, passingData) {
        state.notices = passingData.map(noticeResponse => ({
          ...noticeResponse
        }))
      },

      [REQUEST_NOTICE_TO_SPRING] (state, passingData) {
      
        if (typeof passingData === 'object' && passingData !== null) {
          state.notice = {
            ...passingData,
            noticeImageDataList: passingData.noticeImageDataList
          };
        } else {
          // Handle the case when passingData is not an object
          console.error('passingData is not an object:', passingData);
        }
      }
    
}
