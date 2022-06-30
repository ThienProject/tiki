import * as request from '~/utils/request';

export const search = async (q)=>{
    try {
        const res = await request.get(`shops/search`,{
            params : {
                q
            }
        })
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}