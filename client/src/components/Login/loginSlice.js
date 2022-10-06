import { createSlice } from "@reduxjs/toolkit";
const auth =  createSlice({
    name:'user',
    initialState: {user : {}, token: null},
    reducers: {
        login : (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout : (state, action)=>{
            state.user = {};
        }
    }
});
const {reducer, actions} = auth;
export const {login, logout} = actions;
export default reducer;