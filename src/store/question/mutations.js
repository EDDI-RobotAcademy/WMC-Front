import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING,
    REQUEST_QUESTION_BOARD_BY_CATEGORY,
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
}
