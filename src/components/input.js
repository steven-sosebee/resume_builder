export const Input = ({inputName, inputId, inputType, min, max, inputPlaceholder, inputInitial}) => {

    return (
        <input 
            name={inputName} 
            id={inputId} 
            datatype={inputType} 
            min={min} 
            max={max} 
            placeholder={inputPlaceholder? inputPlaceholder : null} 
            defaultValue={inputInitial? inputInitial : null}
        />
    )
}