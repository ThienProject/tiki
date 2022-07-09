import * as request from '~/utils/request'
const getBrandsByType = async (q) => {
    try {
        const result = await request.get('brand',{
            params : {
                q
            }
        })
        return result.data
    } catch (error) {
        console.log(error);
    }
}
export {getBrandsByType}