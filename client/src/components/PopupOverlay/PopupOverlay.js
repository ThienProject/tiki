import classNames from "classnames/bind";
import style from './PopupOverlay.module.scss';
import { useState } from "react";
import Model from "./Model";
const cx = classNames.bind(style);
function PopupOverlay({ButtonTrigger, FormContent}) {
    const [isShow, setIsShow] = useState(false);

    const closeModel = ()=>{
        setIsShow(false);
    }
    const openModel = ()=>{
        setIsShow(true);
    }

    return ( 
        <>
            {<ButtonTrigger onOpenModel = {openModel} />}
            {
                isShow &&  <Model  
                            FormContent = {FormContent}
                            onCloseModel ={closeModel} />
            }
        </>
    );
}

export default PopupOverlay;
