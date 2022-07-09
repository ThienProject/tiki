import * as request from '~/utils/request';
export const getPromotionToDay = async(q)=>{
    try {
        const result = await request.get(`product/promotion`,{
            params : {
                q 
            }
        })
        return result.data
    } catch (error) {
        console.warn(error);
    }
}
export const getProductLimit = async(offset,size) =>{
    try {
        const result = await request.get(`product/limit`,{
            params : {
                offset,
                size
            }
        })
        return result.data;
    } catch (error) {
        console.log(error)
    }
}