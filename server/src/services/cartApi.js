import * as cartController from '../controller/cart'

function cartApi(router){
    router.post('/cart/add',cartController.addCart);
    router.get('/cart', cartController.getCart);
}
export default cartApi;