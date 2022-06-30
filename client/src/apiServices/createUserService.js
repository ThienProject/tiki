import * as request from '~/utils/request';

export const create = async (dataForm) =>{
    try {
       
        const response = await request.post('user/create',
            dataForm
        );
        console.log(dataForm);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}