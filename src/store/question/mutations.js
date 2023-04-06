import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING
} from './mutation-types'

export default {
  [REQUEST_QUESTION_BOARD_LIST_TO_SPRING](state, passingData) {
    state.questionBoards = passingData
  },
  
  [REQUEST_QUESTION_BOARD_TO_SPRING](state, passingData) {
      state.questionBoard = passingData
  },
  
}
