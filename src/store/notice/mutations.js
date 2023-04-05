import {
    REQUEST_NOTICE_LIST_TO_SPRING,

} from './mutation-types'

export default {


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