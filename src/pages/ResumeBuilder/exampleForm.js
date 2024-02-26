import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";

const exampleFormFields = [
    {
        label:'Example',
        name:'example',
        type:'text'
    }
]

export const ExampleForm = ({skill, index, handleSubmit}) => {
    
    const addExample = (e,updateIndex) => {
        e.preventDefault();
        const inputs = createFormObject(new FormData(e.target));
        const update = skill
        // console.log(test);
        if(!Array.isArray(skill.examples)){
            update.examples = [];
        }
        update.examples.push(inputs);
        handleSubmit(curr=>curr.map((item,index)=>(index == updateIndex? update : item)));

    }

    return (
        <form onSubmit={(e)=>{addExample(e,index)}}>
            {exampleFormFields.map(({name,label,type})=>(
                <div>
                    <label htmlFor={name}>{label}</label><input className={STYLES.input} name={name} type={type}/>
                </div>
            ))}
            <button value={"submit"}>Add Example</button>
        </form>
        )
}