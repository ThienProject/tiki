import * as productController from '../controller/product';
function productApi(router, upload){
    router.get('/product/promotion/',productController.getPromotion);
    router.get('/product/limit',productController.getProducts);
    router.post('/admin/products',productController.getProductsByShop);
    router.post('/product/create', upload("images/products").fields([{ name: 'image_main', maxCount: 1 }, { name: 'colors[image]'}]), productController.create);
}
export default productApi

