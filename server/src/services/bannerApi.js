import * as bannerController from '../controller/banner';
function bannerApi(router){
    router.get('/slider/home-top',bannerController.getSliderHomeTop); // read
    router.get('/banner/home',bannerController.getHomeBanners); // read
}
export default bannerApi

