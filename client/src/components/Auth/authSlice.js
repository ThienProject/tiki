import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersService from '~/apiServices/usersService'
import localService from "~/services/local.service";
import requestAxios from "~/utils/request";
import { useToast } from "~/contexts/Toast";
const initialState = {
    user: localService.getUser(),
    accessToken : localService.getLocalAccessToken(),
    refreshToken : localService.getLocalRefreshToken()
};
// const {success} = useToast();
// thunk tao mot action
export const login = createAsyncThunk('user/login', async (params, thunkApi)=>{
    //thunkApi.dispatch
    const response = await usersService.login(params);
    const { accessToken,refreshToken, user } = response;
    localService.setUser(user);
    localService.updateLocalAccessToken(accessToken);
    localService.updateLocalRefreshToken(refreshToken);
    // requestAxios.defaults.headers.common['refreshToken'] = `Bearer ${refreshToken}`;
    // requestAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response;
})
export const refreshToken = createAsyncThunk('user/get-token', async (params, thunkApi) => {
    const response = await usersService.getToken(params);
    localService.updateLocalAccessToken(response);
    return response;
})

const auth =  createSlice({
    name:'user',
    initialState,
    // tạo action và sử lý response
    reducers: {
        // login : (state, action)=>{
        //     state.user = action.payload.user;
        //     state.token = action.payload.token;
        // },

        logout : (state, action)=>{
            state.user = null;
            state.token = null;
            localService.removeUser()
        },
        
        // updateToken :(state, action) =>{
        //     const token = action.payload.token;
        //     state.token = token
        //     localStorage.setItem(storegeKeys.TOKEN, token);
        //     requestAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // }

    },

    //them du lieu vao reducer theo status "Chi xử lý response, k tạo action => dùng kết hợp với thunk"
    extraReducers : (builder)=>{
        builder.addCase(login.pending,(state, action)=>{
            state.loading = true;
        });
        builder.addCase(login.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(login.fulfilled,(state, action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            
        });

        builder.addCase(refreshToken.fulfilled,(state, action)=>{
            state.token = action.payload;
        })
    }
});
const {reducer, actions} = auth;
export const {logout, updateToken} = actions;
export default reducer;
