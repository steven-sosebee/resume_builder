import { useCallback, useEffect, useState } from "react"

export const useArray= (_array=[])=>{
    const [output, setOutput] = useState(_array);

    const push = (element) => {
        setOutput(current => [...current, element])
    };

    const getIndex = (element, fn) => {
        return output.findIndex(element => fn)
    };

    const remove = (index) => {
            //   newList.splice(index,elements);
            // console.log([...output].splice(index,elements));
              setOutput(current => (current.filter((_,i)=> i !=index)))
              console.log(output);
    };

    const insert = (element,index) => {
        setOutput(current => current.splice(index,0, element))
    }

    const getElement = (fn) => {
        return output.find((fn))
    };

    return {push, getElement, remove, insert, output,setOutput};
}