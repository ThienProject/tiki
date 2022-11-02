import * as request from '~/utils/request';
export const addCart = async (params) => {
    try {
        const res = await request.post('cart/add', params);
        return res.data
    } catch (error) {
        throw(error);
    }
}

export const getCart = async (id_user)=>{
    try {
        const res = await request.get('cart',{
            params : {
                id_user
            }
        });
        return res.data;
    } catch (error) {
        throw(error)
    }
}