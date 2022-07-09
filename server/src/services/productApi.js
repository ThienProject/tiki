import * as productController from '../controller/product';
function productApi(router){
    router.get('/product/promotion/',productController.getPromotion);
    router.get('/product/limit',productController.getProducts);
}
export default productApi