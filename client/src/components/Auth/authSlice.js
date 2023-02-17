import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersService from '~/apiServices/usersService'
import localService from "~/services/local.service";
import store from "~/app/store";
import { getCart } from "~/pages/Cart/cartSlice";

const initialState = ()=>{
    const user = localService.getUser();
    const accessToken  = localService.getLocalAccessToken();
    const refreshToken  = localService.getLocalRefreshToken();
    return {
        user, accessToken, refreshToken
    };
} 

export const isTokenExpired = (token)=>{
    const base64Url = token?.split(".")[1];
    const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
   const { exp } = JSON.parse(jsonPayload);
   const expired = exp * 1000;
   const timeNow = Date.now();
   return (timeNow >= expired)
}

// const {success} = useToast();
// thunk tao mot action
export const login = createAsyncThunk('user/login', async (params, thunkApi)=>{
    //thunkApi.dispatch
    const response = await usersService.login(params);
    const { accessToken,refreshToken, user } = response;

    if(user){
        localService.setUser(user);
        localService.updateLocalAccessToken(accessToken);
        localService.updateLocalRefreshToken(refreshToken);
        const id_user = user.id_user;
        const actionGetCart = getCart(id_user);
        store.dispatch(actionGetCart);
    }
    // cart
    
    // requestAxios.defaults.headers.common['refreshToken'] = `Bearer ${refreshToken}`;
    // requestAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response;
})
export const refreshToken = createAsyncThunk('user/get-token', async (params, thunkApi) => {
    const response = await usersService.getToken(params);
    if(response){
        localService.updateLocalAccessToken(response);
        return response;
    }
    return false;
   
})
export const logout = createAsyncThunk(
    "user/logout", async function (_payload, thunkAPI) {
        localService.removeUser();
        thunkAPI.dispatch({ type: 'logout/LOGOUT' });
        console.log('logged out')
    }
);
const auth =  createSlice({
    name:'user',
    initialState,
    // tạo action và sử lý response
    reducers: {
        // login : (state, action)=>{
        //     state.user = action.payload.user;
        //     state.token = action.payload.token;
        // },

        // logout : (state, action)=>{
        //     store.dispatch({});
        //     localService.removeUser();
        // },
        
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
export const { updateToken} = actions;
export default reducer;
