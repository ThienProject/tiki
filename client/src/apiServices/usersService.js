import * as request from '~/utils/request';
import requestAxios from "~/utils/request";
import storegeKeys from '~/constants/storegeKeys';
export const getAddress  = async (id) =>{
    try {
        const res = await request.get(`user/address`,{
            params : {
                id
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const login = async(params) =>{
    try {
        const res = await request.post(`login`,params)
        return res.data;
    }
    catch (error){
        console.log(error);
    }
}
export const register = async(params) =>{
    try {
        const res = await request.post(`register`,params)
        return res.data;
    }
    catch (error){
        console.log(error);
    }
}

export const profile = async (id,name) => {
    try {
        const res = await request.post(`profile`,{id});
        return res.data;
    }
    catch (error){
        console.log(error);
    }
}
export const getToken = async (id, name) => {
    try {
        const res = await request.post(`token`,{id, name});
        return res.data;
    }
    catch (error){
        console.log(error);
    }
}
