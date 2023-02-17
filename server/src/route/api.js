import express from "express";
import  * as userController  from "../controller/user";
import upload from '../middleware/upload.js'
import cors from 'cors';
import bannerApi from '../services/bannerApi'
import productApi from "../services/productApi";
import categoryApi from "../services/categoryApi";
import brandApi from "../services/brandApi";
import typeApi from "../services/typeApi";
import userApi from "../services/userApi";
import administrativeApi from "../services/administrativeApi";
import bodyParser from 'body-parser'
import cartApi from "../services/cartApi";
import colorApi from "../services/colorApi";
var cookieParser = require('cookie-parser')
let router = express.Router();
function innitAPIRoute(app){
    // CORS 
    app.use(cors());
    // app.use(bodyParser.json());
    app.use(cookieParser());
   /*  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //use express static folder  alow access images
    app.use(express.static("./src/public")) 
   //! Use of Multer
    
    router.get('/users',userController.getAllUser); // read
    router.get('/shops/search/',userController.searchShop); // read
   /*  router.post('/user/create', upload("images/users").single('file') ,userController.create);  */// create
    router.post('/user/create', upload("images/users").array('colors',10) ,userController.create); // create
    router.put('/update-user',userController.update); // update
    /* router.delete('/delete-user/:id',userController.dlt);  */// delete
    router.delete('/delete-user/:id',userController.dlt); 
    
    bannerApi(router);
    productApi(router, upload);
    categoryApi(router);
    brandApi(router);
    typeApi(router);
    userApi(router);
    administrativeApi(router);
    cartApi(router);
    colorApi(router);

    app.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading the files
          console.log('Multer error:', err);
          res.status(500).send('Multer error');
        } else {
          // An unknown error occurred
          console.log('Unknown error:', err);
          res.status(500).send('Unknown error');
        }
    });

    return app.use('/api/',router);

}
export default innitAPIRoute;