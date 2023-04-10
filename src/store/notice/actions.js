import {
  REQUEST_NOTICE_LIST_TO_SPRING,

} from'./mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {

      requestNoticeListToSpring({ commit }) {
        return axiosInst.get('http://localhost:7777/notice/list')
          .then((res) => {
            commit(REQUEST_NOTICE_LIST_TO_SPRING, res.data)
          })
      },

}