import * as request from "utils/request";

export const getAddress = async (id) => {
  try {
    const res = await request.get(`user/address`, {
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const login = async function (params) {
  try {
    const res = await request.post(`login`, params);
    return res.data;
  } catch (error) {
    const e = error;
    throw e;
  }
};
export const register = async (params) => {
  try {
    const res = await request.post(`register`, params);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const profile = async (id) => {
  try {
    const res = await request.post(`profile`, { id });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getToken = async (id, name) => {
  try {
    const res = await request.post(`token`, { id, name });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
