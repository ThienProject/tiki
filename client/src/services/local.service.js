import { default as storegeKeys } from "~/constants/storegeKeys"

const getLocalAccessToken =()=>{
    const user = JSON.parse(localStorage.getItem(storegeKeys.USER));
    const accessToken = user?.access_token;
    return accessToken;
} 

const updateLocalAccessToken =(token)=>{
    const user = JSON.parse(localStorage.getItem(storegeKeys.USER));
    user.access_token = token;
    localStorage.setItem(storegeKeys.USER, JSON.stringify(user));
}

const updateLocalRefreshToken =(refreshToken)=>{
    const user = JSON.parse(localStorage.getItem(storegeKeys.USER));
    user.refresh_token = refreshToken;
    localStorage.setItem(storegeKeys.USER, JSON.stringify(user));
}

const getLocalRefreshToken =()=>{
    const user = JSON.parse(localStorage.getItem(storegeKeys.USER));
    const refreshToken = user?.refresh_token;
    return refreshToken;
} 

const getUser = () => {
    return JSON.parse(localStorage.getItem(storegeKeys.USER));
  };
  
  const setUser = (user) => {
    localStorage.setItem(storegeKeys.USER, JSON.stringify(user));
  };
  
const removeUser = () => {
    localStorage.removeItem(storegeKeys.USER);
};
const localService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    updateLocalAccessToken,
    updateLocalRefreshToken,
    getUser,
    removeUser,
    setUser,
}
export  default localService;