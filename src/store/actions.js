import { 
    REQUEST_PRODUCT_LIST_TO_SPRING ,
    REQUEST_MAIN_PRODUCT_LIST_TO_SPRING ,
    REQUEST_NOTICE_LIST_TO_SPRING,
    REQUEST_NOTICE_TO_SPRING,
} from './mutation-types';

import axios from 'axios';

export default {
  requestCreateProductToSpring({}, payload) {
    const { name, description, price, stock, files } = payload;
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    for (let idx = 0; idx < files.length; idx++) {
      formData.append('fileList[' + idx + ']', files[idx]);
    }
    return axios
      .post('http://localhost:7777/product/register', formData, {
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

  requestProductListToSpring({ commit }) {
    return axios.get('http://localhost:7777/product/list').then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestMainProductListToSpring({ commit }) {
    return axios.get('http://localhost:7777/product/list').then((res) => {
      commit(REQUEST_MAIN_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  

  requestCreateNoticeToSpring({}, payload) {
    const { title, writer, content, files } = payload;
    let formData = new FormData();
    formData.append('title', title);
    formData.append('writer', writer);
    formData.append('content', content);
    for (let idx = 0; idx < files.length; idx++) {
      formData.append('fileList[' + idx + ']', files[idx]);
    }
    return axios
      .post('http://localhost:7777/notice/register', formData, {
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
/*
  requestCreateNoticeToSpring({ }, payload) {
    const { title, content, writer } = payload
    return axios.post('http://localhost:7777/notice/register',
      { title, content, writer })
      .then(() => {
        alert('공지사항 등록 성공!')
      })
      .catch(() => {
        alert('문제 발생!')
      })
  },
*/
  requestNoticeListToSpring({ commit }) {
    return axios.get('http://localhost:7777/notice/list')
      .then((res) => {
        commit(REQUEST_NOTICE_LIST_TO_SPRING, res.data)
      })
  },
  requestNoticeToSpring ({ commit }) {
    return axios.get('http://localhost:7777/notice/${noitceId}')
      .then((res) => {
        commit(REQUEST_NOTICE_TO_SPRING, res.data)
      })
  }
  
};

