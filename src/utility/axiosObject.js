

 

import axios from "axios";
import mainRequest from "@/api/mainRequest";


const axiosInst = axios.create({
    baseURL: 'http://localhost:7777',
    timeout: 2500
})

export default axiosInst