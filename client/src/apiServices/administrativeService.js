import * as request from '~/utils/request'
export const getCity = async () =>{
    try {
        const res = await request.get(`administrative/city`)
        return res.data
    } catch (error) {
        console.error(error);
    }  
}
export const getDistrict = async (idCity) =>{
    try {
        const res = await request.get(`administrative/district`,{
            params : {
                idCity
            }
        })
        return res.data
    } catch (error) {
        console.error(error);
    }  
}

export const getVillage = async (idDistrict) =>{
    try {
        const res = await request.get(`administrative/village`,{
            params : {
                idDistrict
            }
        })
        return res.data
    } catch (error) {
        console.error(error);
    }  
}