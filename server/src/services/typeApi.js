import * as typeController from '../controller/type'
function typeApi(router){
    router.get('/type/featured',typeController.getFeaturedType);
}
export default typeApi