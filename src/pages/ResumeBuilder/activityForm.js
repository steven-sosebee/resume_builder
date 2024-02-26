import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";

const activityFormFields = [
    {
        label:'Achievement',
        name:'achievement',
        type:'text'
    }
]

export const ActivityForm = ({job, index, handleSubmit}) => {
    
    const addActivity = (e,updateIndex) => {
        e.preventDefault();
        const inputs = createFormObject(new FormData(e.target));
        const update = job
        // console.log(test);
        if(!Array.isArray(job.activities)){
            update.activities = [];
        }
        update.activities.push(inputs);
        handleSubmit(curr=>curr.map((item,index)=>(index == updateIndex? update : item)));

    }

    return (
        <form onSubmit={(e)=>{addActivity(e,index)}}>
            {activityFormFields.map(({name,label,type})=>(
                <div>
                    <label htmlFor={name}>{label}</label><input className={STYLES.input} name={name} type={type}/>
                </div>
            ))}
            <button value={"submit"}>Add Activity</button>
        </form>
        )
}