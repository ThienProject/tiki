import * as typeController from '../controller/type'
function typeApi(router){
    router.get('/type/featured',typeController.getFeaturedType);
    router.get('/types',typeController.getTypes);

}
export default typeApi