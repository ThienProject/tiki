import * as colorController from '../controller/color'
function colorApi(router){
    router.get('/colors',colorController.getColors);
}
export default colorApi