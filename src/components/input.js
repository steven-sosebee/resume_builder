export const Input = ({inputName, inputId, inputType, inputClasses, min, max, inputPlaceholder, inputInitial}) => {

    return (
        <input 
            name={inputName} 
            id={inputId} 
            datatype={inputType} 
            className={inputClasses}
            min={min} 
            max={max} 
            placeholder={inputPlaceholder? inputPlaceholder : null} 
            defaultValue={inputInitial? inputInitial : null}
        />
    )
}