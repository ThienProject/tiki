import style from './Toast.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faCircleCheck, faCircleInfo, faTimes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Alert(props){
    const {onDismiss, children, severity, time, idMess} = props;
    const [hide, setHide] = useState(false);
    const type = {
        success : faCircleCheck,
        error :  faBomb,
        info : faCircleInfo,
        warn : faTriangleExclamation
    }
    // const removeRef = useRef(onDismiss);
    // removeRef.current = onDismiss;

    useEffect(()=>{
        console.log("props :",props);
        let hideID = null;
        const timeOut =  setTimeout( () => { 
            setHide(true);
            hideID = setTimeout(() => {
                // console.log('alert Xoa id ', +idMess);
                onDismiss();
            }, 1000); 
            
            // removeRef.current();
            },time);

        return ()=>{
            // console.log('delete a time : ' +id);
            clearTimeout(hideID);
            clearTimeout(timeOut);
        };

         // eslint-disable-next-line
    },[]);

    return (
        <div className={cx('toast-content', severity, {
            onHide : hide,
            onShow : !hide
        })}>
            <FontAwesomeIcon className={cx('icon')} icon ={type[severity]} />
            {console.log(`Render ${idMess}....`)}
            <div>
                <p className={cx('title')}>{severity}</p>
                <p className={cx('content')}>{children}</p>
            </div>

            <FontAwesomeIcon className={cx('icon-times')} icon ={faTimes}

            onClick = {
                ()=>{
                    onDismiss();
                }
            }
            />
        </div>
    )
}
export default (Alert);