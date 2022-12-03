import classNames from "classnames/bind"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from './ChangeQuantity.module.scss'
const cx = classNames.bind(styles);
function ChangeQuantity({init = 1,  setChoice, className, changeAmountCart = null}){
    const [quantity, setQuantity] = useState(init);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(setChoice){
            setChoice( (prev)=>{
                const newChoice = {...prev, quantity : quantity};
                return newChoice;
            })
        }
        
    },[quantity]);

    return (<div className={cx('wrapper',className)}>
        <button className={cx('minus')}
        onClick={()=>{
           
                setQuantity((prev)=>{
                    let quantityNew = 0;
                    
                    if(prev > 1){
                        quantityNew = prev - 1;
                    }

                    if(changeAmountCart){
                        changeAmountCart(quantityNew); 
                    }
                    else{
                        if(quantityNew == 0){
                            quantityNew = 1;
                        }
                    }
                    
                    return quantityNew;
                })

            
        }}
        >-</button>
        <div className={cx('quantity')}>{quantity}</div>
        <button 
            onClick={()=>{
                setQuantity((prev)=>{
                    if(changeAmountCart){
                        changeAmountCart(prev+1);
                    }
                    return prev + 1;
                })
            }}
            className={cx('plus')}>+
        </button>
    </div>)
}
export default ChangeQuantity