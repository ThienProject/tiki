const { useState, useEffect } = require("react");

function useDebounce(value, delay){
    const [valueDebounce, setValueDebounce] = useState(value);
    useEffect(()=>{
       const time =  setTimeout(() => {
            setValueDebounce(value);
        }, delay);

        return ()=>{
            clearTimeout(time);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])
    return valueDebounce;
}
export default useDebounce
