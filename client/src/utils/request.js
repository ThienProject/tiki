import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '~/app/store';
import { logout, refreshToken } from '~/components/Auth/authSlice';
import localService from '~/services/local.service';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
//Axios Interceptors như một bác bảo vệ, chặn các request và response, cho phép bạn xử lý lỗi, config request headers như gắn token vào request, xử lý params
request.interceptors.request.use(
    (config) => {
        const token = localService.getLocalAccessToken();
        const refreshToken = localService.getLocalRefreshToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['refreshToken'] = `Bearer ${refreshToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log(error);
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const {id_user,fullname, ...user} = store.getState().auth.user; 
                const action = refreshToken({ id :id_user,name : fullname});
                const access_token = await store.dispatch(action);
                console.log(access_token);
                unwrapResult (access_token) ;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                // return axiosApiInstance(originalRequest);
                return request(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        else{
             // refreshToken is expired
             if (error.response.status === 400){
                 console.log("Error refreshing   ")
                 const action = logout();
                 store.dispatch(action);
             }
        }
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export default request;
