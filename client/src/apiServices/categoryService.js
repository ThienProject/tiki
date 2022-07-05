import * as request from '~/utils/request'
const getCategory = async ()=>{
    try {
        const result = await request.get('category');
        return result.data;
    } catch (error) {
        console.error(error);
    }
}
export {
    getCategory
}