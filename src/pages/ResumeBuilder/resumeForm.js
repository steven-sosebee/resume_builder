import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";

const resumeFormFields = [
    {
        label:'Title',
        name:'name',
        type:'text'
    }
]


export const ResumeForm = ({data,handleSubmit}) => {

    const updateResumeData = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        console.log(value);
        handleSubmit(curr => ({...curr,name:value}))
    }
    console.log(data);
    return (
        <form onSubmit={handleSubmit}>
            {resumeFormFields.map(({label,type,name})=>(
                <div>
                    <label htmlFor={name}>{label}</label><input defaultValue={data} onChange={updateResumeData} className={STYLES.input} name={name} type={type}/>
                </div>           
                ))}
            {/* <button value={"submit"}>{ICONS.action}</button> */}
        </form>
    )
}