import  { useContext, createContext } from "react";

export const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);