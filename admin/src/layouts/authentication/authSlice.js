import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as usersService from "apiServices/usersService";

import localService from "services/local.service";

const initialState = () => {
  const user = localService.getUser();
  const accessToken = localService.getLocalAccessToken();
  const getRefreshToken = localService.getLocalRefreshToken();
  return {
    user,
    accessToken,
    getRefreshToken,
  };
};

export const isTokenExpired = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  const { exp } = JSON.parse(jsonPayload);
  const expired = exp * 1000;
  const timeNow = Date.now();
  return timeNow >= expired;
};

// const {success} = useToast();
// thunk tao mot action
export const login = createAsyncThunk("user/login", async (params) => {
  //  thunkApi.dispatch
  try {
    const response = await usersService.login(params);
    const { accessToken, getRefreshToken, user } = response;
    if (user) {
      localService.setUser(user);
      localService.updateLocalAccessToken(accessToken);
      localService.updateLocalRefreshToken(getRefreshToken);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getRefreshToken = createAsyncThunk("user/get-token", async (params) => {
  const response = await usersService.getToken(params);
  if (response) {
    localService.updateLocalAccessToken(response);
    return response;
  }
  return false;
});
export const logout = createAsyncThunk("user/logout", async (_payload, thunkAPI) => {
  localService.removeUser();
  thunkAPI.dispatch({ type: "logout/LOGOUT" });
});
const auth = createSlice({
  name: "user",
  initialState,
  // tạo action và sử lý response
  reducers: {},

  // them du lieu vao reducer theo status "Chi xử lý response, k tạo action => dùng kết hợp với thunk"
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.getRefreshToken = action.payload.getRefreshToken;
    });

    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});
const { reducer, actions } = auth;
export const { updateToken } = actions;
export default reducer;
