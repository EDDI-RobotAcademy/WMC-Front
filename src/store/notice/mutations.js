import {
    REQUEST_NOTICE_LIST_TO_SPRING,
    REQUEST_NOTICE_TO_SPRING
} from './mutation-types'

export default {
    [REQUEST_NOTICE_LIST_TO_SPRING] (state, passingData) {
        state.notices = passingData.map(noticeResponse => ({
          ...noticeResponse
        }))
      }
    
}