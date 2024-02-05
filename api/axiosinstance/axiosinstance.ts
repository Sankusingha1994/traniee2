import axios from "axios";

const axiosinstance=axios.create({
   baseURL:process.env.NEXT_BASE_URL
})

export default axiosinstance;