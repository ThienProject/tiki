import * as administrativeController from '../controller/administrative'
function administrativeApi(router){
    router.get(`/administrative/city`,administrativeController.getCity);
    router.get(`/administrative/district`,administrativeController.getDistrict);
    router.get(`/administrative/village`,administrativeController.getVillage);
}
export default administrativeApi
