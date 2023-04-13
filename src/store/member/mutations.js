import {
  COMMIT_IS_AUTHENTICATED,
  REQUEST_MY_PAGE_MEMBER_INFO,

} from './mutation-types'

export default {
  [COMMIT_IS_AUTHENTICATED] (state, passingData) {
      state.isAuthenticated = passingData;
  },
  [REQUEST_MY_PAGE_MEMBER_INFO] (state, passingData) {
      state.member = passingData;
  }
 
}   