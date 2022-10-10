import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersService from '~/apiServices/usersService'
import storegeKeys from "~/constants/storegeKeys";
import requestAxios from "~/utils/request";

const initialState = {
    user: JSON.parse(localStorage.getItem(storegeKeys.USER)),
    token : localStorage.getItem(storegeKeys.TOKEN)
};

// thunk tao mot action
export const login = createAsyncThunk('user/login', async (params, thunkApi)=>{
    //thunkApi.dispatch
    const response = await usersService.login(params);
    const { token, user } = response;
    localStorage.setItem(storegeKeys.USER, JSON.stringify(user) );
    localStorage.setItem(storegeKeys.TOKEN, token);

    requestAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response;
})

const auth =  createSlice({
    name:'user',
    // initialState: {
    //     user : {}, 
    //     token: null,
    //     loading: false,
    //     error: ''
    // },
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
            localStorage.removeItem(storegeKeys.USER);
            localStorage.removeItem(storegeKeys.TOKEN);
        }
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
            state.token = action.payload.token;
        });
    }
});
const {reducer, actions} = auth;
export const {logout} = actions;
export default reducer;
