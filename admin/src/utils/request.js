import axios from "axios";

import type store from "app/store";
import { unwrapResult } from "@reduxjs/toolkit";

import { logout, getRefreshToken } from "layouts/authentication/authSlice";

import localService from "services/local.service";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    const token = localService.getLocalAccessToken();
    const refreshToken = localService.getLocalRefreshToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    /* eslint no-underscore-dangle: ["error", { "allow": ["_retry"] }] */
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const { idUser, fullname } = store.getState().auth.user;
        const action = getRefreshToken({ id: idUser, name: fullname });
        const accessToken = await store.dispatch(action);

        unwrapResult(accessToken);
        if (accessToken) {
          // console.log("token get again : ", accessToken);
          originalRequest._retry = true;
          /* eslint no-underscore-dangle: ["error", { "allow": ["_retry"] }] */
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return request(originalRequest);
        }
        // console.log("Error refreshing");
        store.dispatch(logout());

        // return axiosApiInstance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
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
