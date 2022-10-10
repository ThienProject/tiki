import * as userController from '../controller/user'

function userApi(router){
    router.get('/user/address',userController.getAddress);
    router.post('/profile',userController.profile);
    router.post('/login',userController.login);
    router.post('/register',userController.register);
}
export default userApi