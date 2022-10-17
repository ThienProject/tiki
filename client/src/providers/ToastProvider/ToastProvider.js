import { useState } from "react";
import { ToastContext } from "~/contexts/Toast";
import Toast from "./component/Toast";

function ToastProvider(props)
{
    const {children} = props;
    const [state, setState] = useState({isShow : false});
    const show = (message) =>{
        setState({isShow : true, message: message});
    }
    const hide = () =>{
        setState({isShow : false});
    }

    const success = (message) =>{
        show({type : 'success', text: message});
    }

    const error = (message) =>{
        show({type : 'error', text: message});
    }

    const info = (message) =>{
        show({type : 'info', text: message});
    }

    const warn = (message) =>{
        show({type : 'warn', text: message});
    }
    const {isShow, message} = state;
    console.log(state);
    return  <ToastContext.Provider
            value={{
                error: error,
                warn: warn,
                info: info,
                success: success,
                hide: hide
            }}
                    > 
                {children}
                {message && (
                    <Toast onShow={isShow} severity={message.type} time = {5000} >
                        {message.text}
                    </Toast>
                )} 
            </ToastContext.Provider>;    
}
export  {ToastProvider};