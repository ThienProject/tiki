import * as cartController from '../controller/cart'
import {isAuth} from '../middleware/auth.middleware'
function cartApi(router){
    router.post('/cart/add',cartController.addCart);
    router.post('/cart/update',isAuth,cartController.updateCart);
    router.get('/cart',isAuth, cartController.getCart);
    router.post('/cart/update/checked',isAuth, cartController.updateChecked);
    router.post('/cart/delete',isAuth, cartController.deleteCart);
}
export default cartApi;