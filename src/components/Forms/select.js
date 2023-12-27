export const Select = (props) => {
    const {
        selectRef,
        selectOptions,
        selectInitial
    }=props;

    const options = 
        selectOptions.map(option =>(
            <option value={option}>{option}</option>
        ));

    return (
        <select defaultValue={selectInitial}
            ref={selectRef}
        >
            {options}
        </select>
    )
}