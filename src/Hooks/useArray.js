import { useCallback, useState } from "react"

export const useArray= (_array=[])=>{
    const [output, setOutput] = useState();
    
    const push = (element) => useCallback(()=>{
        setOutput(current => [...current, element])
    });

    const getIndex = (element, fn) => useCallback(()=>{
        return output.findIndex(element => fn)
    });


    const remove = (index, elements) => useCallback(()=>{
            //   newList.splice(index,elements);
              setOutput(current => current.splice(index, elements))
    });

    const insert = (element,index) => useCallback(()=>{
        setOutput(current => current.splice(index,0, element))
    })
    return {push, getIndex,remove, insert, output,setOutput};
}