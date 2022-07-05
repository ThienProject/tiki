import * as request from '~/utils/request';

export const getSliderHomeTop = async ()=>{
    try {
        const res = await request.get(`slider/home-top`)
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}
export const getBannerHome = async ()=>{
    try{
        const res = await request.get('banner/home');
        return res.data;
    }
    catch(err){
        console.warn(err);
    }
}