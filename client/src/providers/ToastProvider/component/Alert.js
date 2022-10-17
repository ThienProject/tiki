import style from './Toast.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faCircleCheck, faCircleInfo, faTimes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Alert({ dle,index, children, severity}){

    const type = {
        success : faCircleCheck,
        error :  faBomb,
        info : faCircleInfo,
        warn : faTriangleExclamation

    }
    
    return (
        <div className={cx('toast-content',severity)}>
            <FontAwesomeIcon className={cx('icon')} icon ={type[severity]} />
            <div>
                <p className={cx('title')}>{severity}</p>
                <p className={cx('content')}>{children}</p>
            </div>
            
            <FontAwesomeIcon className={cx('icon-times')} icon ={faTimes}
            onClick = {
                ()=>{
                    dle(index);
                }
            }
            />
        </div>
    )
}
export default Alert;