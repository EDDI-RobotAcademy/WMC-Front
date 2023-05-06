import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING,
    REQUEST_QUESTION_BOARD_BY_CATEGORY,
    REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING,

} from'./mutation-types'

import axiosInst from '@/utility/axiosObject'
import mainRequest from "@/api/mainRequest";


export default {

    requestCreateQuestionBoardToSpring({}, payload) {
        const { title, content, writer, files, questionCategoryType } = payload;
        let formData = new FormData();
        formData.append('title', title);
        formData.append('writer', writer);
        formData.append('content', content);
        formData.append('questionCategoryId', questionCategoryType)
        for (let idx = 0; idx < files.length; idx++) {
          formData.append('fileList[' + idx + ']', files[idx])
        }
        return mainRequest
          .post('/questionBoard/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            alert('질문을 등록하였습니다');
          })
          .catch(() => {
            alert('문제 발생!');
          });
      },
    
      requestQuestionBoardListToSpring ({ commit }) {
        console.log('requestQuestionBoardListToSpring()')
        return mainRequest.get('/questionBoard/list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            })
      },
/*
      async fetchQuestionById(_, questionBoardId){
        try{
          const response = await axiosInst.get(`http://localhost:7777/questionBoard/read/`, {
            params: { questionBoardId },
          });
          return response.date;
        }catch (error) {
          console.error('에러', error);
        }
      },
*/
      requestQuestionBoardToSpring ({ commit }, questionBoardId) {
        console.log('requestQuestionBoardListToSpring()')
        return axiosInst.get(`http://localhost:7777/questionBoard/read/${questionBoardId}`)
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_TO_SPRING, res.data)
            })
      },

      requestQuestionBoardByCategory({ commit }, questionCategoryId) {
        return axiosInst.get('http://localhost:7777/questionBoard/questionListByCategory', {
          params: { questionCategoryId }
        }).then((res) => {
          commit(REQUEST_QUESTION_BOARD_BY_CATEGORY, res.data)
        })
      },


    // 댓글 리스트 UI
    requestQuestionCommentListFromSpring ({ commit }, questionBoardId) {
      console.log('requestQuestionCommentListFromSpring()')

      return axiosInst.get(`/questionBoard/comment/${questionBoardId}`)
          .then((res) => {
              commit(REQUEST_QUESTION_COMMENT_LIST_FROM_SPRING, res.data)
          })
    },

    // 댓글 리스트 등록
    requestQuestionCommentRegisterToSpring ({ }, payload) {
        console.log('requestQuestionCommentRegisterToSpring()')
        const { writer, comment, questionBoardId } = payload

        console.log("댓글 등록 : " + questionBoardId)
        return axiosInst.post('/questionBoard/comment/register',
            { writer, comment, questionBoardId})
            .then(() => {
                alert('댓글 등록을 완료하였습니다.')
            })
            .catch(() => {
              alert('댓글 등록 실패')
            })
    },


    requestQuestionCommentDeleteToSpring({}, payload) {
      const { questionCommentId } = payload
      return axiosInst.delete(`/questionBoard/comment/${questionCommentId}`)
          .then(() => {
              alert("댓글 삭제 성공!");
          })
          .catch(() => {
              alert("문제 발생!");
          });
    },

  
      
};

