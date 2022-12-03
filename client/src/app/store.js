import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '~/components/Auth/authSlice';
import cartReducer from '~/pages/Cart/cartSlice';
const rootReducer = combineReducers({
    auth : authReducer,
    cart : cartReducer,
})

const reducerProxy = (state,action) => {
    if(action.type === 'logout/LOGOUT') {
        console.log("logout");
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
  }
  

const store  = configureStore({
    reducer: reducerProxy
})


export default store;