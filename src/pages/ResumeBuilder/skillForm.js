import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { Rating } from "../../components/widgets/ratings/ratings";
import { useFetch } from "../../Hooks/useFetch";
import { ENDPOINTS } from "../../data/endpoints";

const skillLevelsMap = new Map([
    [1,'Novice'],
    [2,'Proficient'],
    [3,'Experienced'],
    [4,'Advanced'],
    [5,'Expert']
])

const skillFormFields = [
    {
        label:'Skill',
        name:'skill',
        type:'text'
    },
    {
        label:'Level',
        name:'level',
        type:'range',
        min:1,
        max:5
    },
    {
        label:'Type',
        name:'skillType',
        type:'select',
        options:[
            {label:'Management',value:1},
            {label:'Automation',value:2},
            {label:'Project',value:3},
            {label:'Data Analysis',value:4}

        ]
    }
];
	
export const SkillForm = ({selected, data, updateData, handleSubmit, closeDialog}) => {
    const skillSet = new Set (selected.map(skill=>(skill.id)));
    const api = useFetch();

    const newSkillSubmit = async (e) => {
        e.preventDefault();
        const inputs = createFormObject(new FormData(e.target));
        
        const {data,status} = await api.apiInsert({endpoint:ENDPOINTS.Skill,newValues:[inputs]});
        
        if(status==200){
            
            inputs.level = skillLevelsMap.get(parseInt(inputs.level));
            inputs.id = parseInt(data[0].ID);
            updateData(curr=>([...curr,inputs]));
            // console.log(inputs);

        }
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
            <form className={STYLES.form} onSubmit={newSkillSubmit}>
                    {skillFormFields.map(({name,label,type, min, max,options=[]})=>(
                        <div>
                            <label htmlFor={name}>{label}</label>
                            {type=='select'?
                                <select className={STYLES.input} name={name}>{options.map(option=>(<option value={option.value}>{option.label}</option>))}</select> :
                                <input min={(type=='range')? min : null} max={type=='range'? max : null} className={STYLES.input} name={name} type={type}/>}
                        </div>
                    ))}
                    <button value={"submit"} className={STYLES.submitButton}>{ICONS.add}</button>
            </form>
            
            <form onSubmit={skillsTest} className={STYLES.spaced + ' base'}>
                {data.map(({skill,id,level})=>(
                    <div className={STYLES.wideFlexbox + ' height-spacing' }>
                        <label style={{overflow:'hidden'}} htmlFor={skill}>{skill}: {level}</label><input id={skill} name={skill} type={"checkbox"} defaultChecked={skillSet.has(id)} value={JSON.stringify({skill:skill,id:id, level:level})}/>
                    </div>
                ))}
                <button value={'submit'} className={STYLES.floatingButton}>{ICONS.add}</button> 
            </form>
         
        </div>
    )
}