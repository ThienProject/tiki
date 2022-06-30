import multer from 'multer';
import path from "path";
const upload = (url)=>{
    var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './src/public/'+url)  ;   // './public/images/' directory name where save the file
        },
        filename: (req, file, callBack) => {
            //console.log(file);
            callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({
                    storage:storage   
                });
    return upload
}
export  default upload
   
    

