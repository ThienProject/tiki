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
export const getProductLimit = async(offset,size, category, product_id) =>{
    try {
        const result = await request.get(`product/limit`,{
            params : {
                offset,
                size,
                category,
                product_id
            }
        })
        return result.data;
    } catch (error) {
        console.log(error)
    }
}