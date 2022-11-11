import { useRef } from "react";
import classNames from "classnames/bind";
import style from './PopupOverlay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Model({FormContent, onCloseModel}) {
    const bodyRef = useRef();
    const onClickOutside =(e)=>{
        if(bodyRef.current.contains(e.target)){
            return;
        }
        else{
            onCloseModel();
        }
    }
    return (
        <div className={cx('model')}>
            <div  className={cx('cover')}
                onClick = {onClickOutside}
                >
                <div className={cx('model')}>
                    <div ref={bodyRef} className={cx('model-body')}>
                        <FormContent  onCloseModel = {onCloseModel} />
                    </div>  
                    <button
                        className={cx('btn-close')}
                    ><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                
            </div>
        </div>      
        
       
    );
}

export default Model;