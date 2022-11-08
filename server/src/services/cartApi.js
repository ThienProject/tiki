import * as cartController from '../controller/cart'

function cartApi(router){
    router.post('/cart/add',cartController.addCart);
    router.post('/cart/update',cartController.updateCart);

    router.get('/cart', cartController.getCart);
}
export default cartApi;