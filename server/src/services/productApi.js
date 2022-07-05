import * as productController from '../controller/product';
function productApi(router){
    router.get('/product/promotion/',productController.getPromotion)
}
export default productApi