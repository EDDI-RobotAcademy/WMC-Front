import {
    REQUEST_PRODUCT_LIST_TO_SPRING,

} from './mutation-types'
import axios from 'axios'

export default {
    requestCreateProductToSpring ({}, payload) {

        const { productName, content, writer, price } = payload
        return axios.post('http://localhost:7777/product/register',
            { productName, content, writer, price })
            .then(() => {
                alert('상품 등록 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },

    requestProductListToSpring ({ commit }) {
        return axios.get('http://localhost:7777/product/list')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
            })
    },

}