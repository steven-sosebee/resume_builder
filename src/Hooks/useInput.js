import { useState } from "react";

export const useInput = ({inputName="", inputType="text", inputId=null, inputInitial=null, inputPlaceholder=null, inputClasses=null}) => {
const [value, setValue] = useState(inputInitial);

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.value !== value){
            setValue(current=>e.target.value);
        };
    };

    const element = (stateClasses=null, min=0, max=null, inputRef=null, handleValidation=null) =>(
        <input 
            ref={inputRef}
            name={inputName} 
            id={inputId} 
            type={inputType} 
            className={stateClasses? stateClasses: inputClasses}
            min={min} 
            max={max} 
            placeholder={inputPlaceholder? inputPlaceholder : null} 
            defaultValue={inputInitial? inputInitial : null}

            onChange={handleValidation}
            onBlur={handleChange}
        />)

        return {element, value}
    
}