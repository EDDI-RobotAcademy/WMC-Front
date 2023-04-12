import {
    REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
    REQUEST_QUESTION_BOARD_TO_SPRING,
} from'./mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {

    requestCreateQuestionBoardToSpring({}, payload) {
        const { title, content, writer, files } = payload;
        let formData = new FormData();
        formData.append('title', title);
        formData.append('writer', writer);
        formData.append('content', content);
        for (let idx = 0; idx < files.length; idx++) {
          formData.append('fileList[' + idx + ']', files[idx])
        }
        return axiosInst
          .post('http://localhost:7777/questionBoard/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            alert('상품 등록 성공!');
          })
          .catch(() => {
            alert('문제 발생!');
          });
      },
    
      requestQuestionBoardListToSpring ({ commit }) {
        console.log('requestQuestionBoardListToSpring()')
        return axiosInst.get('http://localhost:7777/questionBoard/list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            })
    },
      
};