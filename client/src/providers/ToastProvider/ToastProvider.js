import { useState } from 'react';
import { ToastContext } from '~/contexts/Toast';
import Alert from './component/Alert';
import Toast from './component/Toast';

function ToastProvider(props) {
    const { children } = props;
    const [toastList, setToastList] = useState([]);
    const setToasts = (message) => {
        setToastList((prev) => {
            console.log(prev);
            const idMess = prev.length;
            return [...prev , {idMess, ...message}];
        });
    };

  
    const success = (message) => {
        setToasts({ severity: 'success', text: message });
    };

    const error = (message) => {
        setToasts({ severity: 'error', text: message });
    };

    const info = (message) => {
        setToasts({ severity: 'info', text: message });
    };

    const warn = (message) => {
        setToasts({ severity: 'warn', text: message });
    };

    const dle = (id)=>{ 
        setToastList((prev) => {
            console.log(id);
            console.log("length :" +prev.length)
            const newArr = prev.filter((val)=>{
                return val.idMess !== id;
            })
            console.log("mang sau khi xoá : ", newArr);
            return  newArr;
        })
    };

    const onDismiss = (id) =>  () => dle(id);
    // console.log("toast list :",toastList);

    return (
        <ToastContext.Provider
            value={{
                error: error,
                warn: warn,
                info: info,
                success: success,
            }}
        >
            {children}

            {
                <Toast>
                    {console.log("render container")}
                    {toastList &&
                        toastList.map((item, index) => {
                            return (
                                <Alert idMess={item.idMess} time={3500} onDismiss={onDismiss(item.idMess)} severity={item?.severity} key={item.idMess}>
                                    {item?.text}
                                </Alert>
                            );
                        })}
                </Toast>
            }
        </ToastContext.Provider>
    );
}
export { ToastProvider };
