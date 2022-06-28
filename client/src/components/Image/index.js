import {forwardRef, useState} from "react";
import images from "~/assets/images";

const  Image = forwardRef(({alt, src, fallback : customFallback = images.noImg, ...props},ref) => {

    const [fallback, setFallback] = useState('');
    return <img 
            src = { fallback || src}
            ref= {ref} 
            alt = {alt} 
            {...props} 
            onError ={()=>{
                setFallback((customFallback))
            }}
            />
})
export default Image
