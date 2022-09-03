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