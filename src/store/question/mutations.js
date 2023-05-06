import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING,
    REQUEST_QUESTION_BOARD_BY_CATEGORY,
    REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING,
} from './mutation-types'

export default {
  [REQUEST_QUESTION_BOARD_LIST_TO_SPRING](state, passingData) {
    state.questionBoards = passingData
  },
  
  [REQUEST_QUESTION_BOARD_TO_SPRING](state, passingData) {
      state.questionBoard = passingData
  },
  [REQUEST_QUESTION_BOARD_BY_CATEGORY](state, passingData) {   
    if (!passingData) {
      console.error('The data passed to REQUEST_PRODUCT_LIST_BY_CATEGORY mutation is undefined')
      return
    }
    state.questionBoard = passingData
  },

  //[REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING] (state, passingData) {
   // state.questionComments = passingData
//},

[REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING](state, questionComments) { // 댓글 목록 업데이트 메서드 추가
  state.questionComments = questionComments;
},
}
