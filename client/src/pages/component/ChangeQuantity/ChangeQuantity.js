import classNames from "classnames/bind"
import { useEffect, useState } from "react";
import styles from './ChangeQuantity.module.scss'
const cx = classNames.bind(styles);
function ChangeQuantity({init = 1,setChoice, className}){
    const [quantity, setQuantity] = useState(init);

    useEffect(()=>{
        if(setChoice){
            setChoice((prev)=>{
                const newChoice = {...prev, quantity : quantity};
                return newChoice;
            })
        }
         
    },[quantity]);

    return (<div className={cx('wrapper',className)}>
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