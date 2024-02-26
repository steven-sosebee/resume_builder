import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
const jobFormFields = [
    {
        label:'Job Title',
        name:'title',
        type:'text'
    },
    {
        label:'Organization',
        name:'organization',
        type:'text'
    },
    {
        label:'Start',
        name:'start',
        type:'date'
    },
    {
        label:'End',
        name:'end',
        type:'date'
    }
]

export const JobForm = ({selected, data, updateData, handleSubmit, closeDialog})=>{
    const dataSet = new Set (selected.map(job=>(job.id)));
const addJob = (e) => {
        e.preventDefault();
        const inputs = createFormObject(new FormData(e.target));
        handleSubmit(curr=>([...curr,inputs]));
        closeDialog();
    }

    const skillsTest = (e) => {
        e.preventDefault();
        const inputs = Array.from(new FormData(e.target).entries()).map(skill=>(JSON.parse(skill[1])));
        console.log(inputs);
        handleSubmit(curr => [...inputs]);
        closeDialog();
    }

    return (
    <div>
        <form onSubmit={addJob}>
                    {jobFormFields.map(({name,label,type})=>(
                        <div>
                            <label htmlFor={name}>{label}</label><input className={STYLES.input} name={name} type={type}/>
                        </div>             
                    ))}
                    <button value={"submit"}>Add Job</button>
                    </form>
                    <form onSubmit={skillsTest} className={STYLES.spaced + ' base'}>
                {data.map(({title,id,organization, start, end, description})=>(
                    <div className={STYLES.wideFlexbox + ' height-spacing' }>
                        <label style={{overflow:'hidden'}} htmlFor={id}>{title}</label><input id={id} name={id} type={"checkbox"} defaultChecked={dataSet.has(id)} value={JSON.stringify({title:title,id:id, organization:organization, description: description, start:start, end:end})}/>
                    </div>
                ))}
                <button value={'submit'} className={STYLES.floatingButton}>{ICONS.add}</button> 
            </form>
                    </div>
                    )
}