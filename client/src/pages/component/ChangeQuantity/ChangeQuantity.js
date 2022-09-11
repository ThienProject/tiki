import classNames from "classnames/bind"
import { useState } from "react";
import styles from './ChangeQuantity.module.scss'
const cx = classNames.bind(styles);
function ChangeQuantity(){
    const [quantity, setQuantity] = useState(1);

    return (<div className={cx('wrapper')}>
        <button className={cx('minus')}
        onClick={()=>{
            if(quantity !== 1){
                setQuantity((prev)=>{
                    return prev - 1;
                })
            }
        }}
        >-</button>
        <div className={cx('quantity')}>{quantity}</div>
        <button 
            onClick={()=>{
                setQuantity((prev)=>{
                    return prev + 1;
                })
            }}
            className={cx('plus')}>+
        </button>
    </div>)
}
export default ChangeQuantity