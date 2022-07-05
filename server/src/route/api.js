import express from "express";
import  * as userController  from "../controller/user";
import upload from '../middleware/upload.js'
import cors from 'cors';
import bannerApi from '../services/bannerApi'
import productApi from "../services/productApi";
import categoryApi from "../services/categoryApi";
/* import bodyParser from 'body-parser' */
let router = express.Router();
function innitAPIRoute(app){
    // CORS 
    app.use(cors());
     
   /*  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); */

    //use express static folder  alow access images
    app.use(express.static("./src/public")) 
   //! Use of Multer
    
    router.get('/users',userController.getAllUser); // read
    router.get('/shops/search/',userController.searchShop); // read
   /*  router.post('/user/create', upload("images/users").single('file') ,userController.create);  */// create
    router.post('/user/create', upload("images/users").array('file',10) ,userController.create); // create
    router.put('/update-user',userController.update); // update
    /* router.delete('/delete-user/:id',userController.dlt);  */// delete
    router.delete('/delete-user/:id',userController.dlt); 
    bannerApi(router);
    productApi(router);
    categoryApi(router);
    return app.use('/api/',router)
}
export default innitAPIRoute;