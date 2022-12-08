import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "layouts/authentication/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const reducerProxy = (state, action) => {
  if (action.type === "logout/LOGOUT") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const store = configureStore({
  reducer: reducerProxy,
});

export default store;
