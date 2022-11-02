import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/components/Auth/authSlice';
import cartReducer from '~/pages/Cart/cartSlice';
const rootReducer = {
    auth : authReducer,
    cart : cartReducer,
}
const store  = configureStore({
    reducer: rootReducer
})
export default store;