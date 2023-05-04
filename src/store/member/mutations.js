import {
  COMMIT_IS_AUTHENTICATED,
  REQUEST_MY_PAGE_MEMBER_INFO,
  UPDATE_MEMBER,
  REQUEST_MANAGER_CHECK,
} from './mutation-types'

export default {
  [COMMIT_IS_AUTHENTICATED](state, passingData) {
    state.isAuthenticated = passingData;
  },
  [REQUEST_MY_PAGE_MEMBER_INFO](state, passingData) {
    state.member = passingData;
  },
  [UPDATE_MEMBER](state, newPassword) {
    state.member = member;
  },
  [REQUEST_MANAGER_CHECK](state, passingData) {
    state.manager = passingData;
  }

}   