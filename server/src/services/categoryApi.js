import * as categoryController from '../controller/category';
function categoryApi(router){
    router.get('/category',categoryController.getCategory);
}
export default categoryApi