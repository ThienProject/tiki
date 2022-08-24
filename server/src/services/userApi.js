import * as userController from '../controller/user'

function userApi(router){
    router.get('/user/address',userController.getAddress)
}
export default userApi