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

export const updateCart = async(id_cart, quantity)=>{
    try {
        const res = await request.post('cart/update', {id_cart, quantity});
        return res.data
    } catch (error) {
        throw(error);
    }
}

export const deleteCart = async(id_cart)=>{
    try {
       return  await updateCart(id_cart,0);
    } catch (error) {
        throw(error);
    }
}

export const deleteAllCart = async(id_user)=>{
    try {
        // console.log("params:",params);
        const res = await request.post('cart/delete', {id_user});
        return res.data
    } catch (error) {
        throw(error);
    }
}
export const updateChecked = async(params)=>{
    try {
        // console.log("params:",params);
        const res = await request.post('cart/update/checked', params);
        return res.data
    } catch (error) {
        throw(error);
    }
}
