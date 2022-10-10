import axios from 'axios';
console.log(process.env)
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL 
})
//Axios Interceptors như một bác bảo vệ, chặn các request và response, cho phép bạn xử lý lỗi, config request headers như gắn token vào request, xử lý params
// request.interceptors.request.use(async(config)=>{
    
// })

export const get = async (path, options = {})=>{
    const response = await request.get(path, options);
    return response.data;
}
export const post = async(path, options = {})=>{
    const response = await request.post(path,options);
    return response.data;
}
export default request;