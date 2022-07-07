import * as brandController from '../controller/brand';
function brandApi(router){
    router.get('/brand',brandController.getBrandByType);
}
export default brandApi