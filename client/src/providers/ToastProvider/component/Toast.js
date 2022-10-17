import style from './Toast.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Alert from './Alert';
const cx = classNames.bind(style);

function Toast(props) {
        const {severity, time, children} = props;
        const [toastList, setToastList]  = useState([]);
      
        const dle = (index)=>{
            setToastList((prev) =>{
                return prev.filter((val, i)=>{
                    return i !== index;
                })
            })
        }
        useEffect(()=>{
            setToastList((prev)=>{
                return [...prev,
                    {severity,children}
                ]
            })

            const timeOut = setTimeout(() => { 
                setToastList((prev)=>{
                    return prev.slice(0, prev.length-1);
                });
                },time);

            // return ()=>{
            //     console.log('delete a time')
            //     clearTimeout(timeOut);
            // };
        },[props])
            
        
        
        // useEffect(() => {
        //     const timeOut = ()=>{ 
        //     }
        //     timeOut();

        //     return () =>{
        //         console.log('unmount')
        //         window.removeEventListener('timeOut',timeOut);
        //     }
      
        //   },[toastList])

    console.log(toastList)
    
    return (
    <div className ={cx('wrapper', {active : true})}>
        {Array.isArray(toastList) && toastList.map((item, index)=>{
           return <Alert index = {index} dle = {dle} severity={item.severity}  key={index} > 
                {item.children}
            </Alert>
        })}
    </div>
    )
}
export default Toast;