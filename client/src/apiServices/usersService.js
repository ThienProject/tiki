import * as request from '~/utils/request'

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
export const profile = async (id) => {
    try {
        const res = await request.post(`profile`,{id});
        return res.data;
    }
    catch (error){
        console.log(error);
    }
}