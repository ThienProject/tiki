import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/components/Login/loginSlice';
const rootReducer = {
    auth: authReducer
}
const store  = configureStore({
    reducer: rootReducer
})
export default store;