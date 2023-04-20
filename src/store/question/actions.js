import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING,
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
      
};