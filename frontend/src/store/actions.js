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
}