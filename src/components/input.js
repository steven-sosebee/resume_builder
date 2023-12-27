import { useState } from "react";

export const Input = ({inputName, inputId, inputType, inputClasses, min, max, inputPlaceholder, inputInitial,inputRef, handleValidation, output}) => {
const [value, setValue] = useState(inputInitial);

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.value !== value){
            setValue(current=>e.target.value);
            output(e.target.value);
        };
    };


    return (
        <input 
            ref={inputRef}
            name={inputName} 
            id={inputId} 
            type={inputType} 
            className={inputClasses}
            min={min} 
            max={max} 
            placeholder={inputPlaceholder? inputPlaceholder : null} 
            defaultValue={inputInitial? inputInitial : null}

            onChange={handleValidation}
            onBlur={handleChange}
        />
    )
}