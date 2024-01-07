import { useEffect, useState } from "react"
import { STYLES } from "../data/styleClasses"
import { criterion, useFetch } from "../Hooks/useFetch"
import { ENDPOINTS } from "../data/endpoints";
import { createFormObject } from "../utils/utils";
import { ICONS } from "../data/iconClasses";

export const Skills = () => {
    const api = useFetch();
    const [skills, setSkills] = useState([])
    const [skillTypes, setSkillTypes] = useState([]);
    const [skillLevels, setSkillLevels] = useState([]);

    const initialize = async () => {
        const {data:apiSkills} = await api.execute({endpoint:ENDPOINTS.getSkills});
        const {data:apiTypes} = await api.execute({endpoint:ENDPOINTS.getSkillTypes});
        const {data: apiLevels} = await api.execute({endpoint:ENDPOINTS.getSkillLevels});

        console.log(apiSkills);
        setSkills(apiSkills);
        setSkillTypes(apiTypes);
        setSkillLevels(apiLevels);
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = new FormData(e.target);

        const {data:newId} = await api.execute({endpoint:ENDPOINTS.createSkill, inputs:createFormObject(input)});
        console.log(newId);    
        initialize();

    }

    const handleDelete = async (e) => {
        const id = e.currentTarget.id;
        const {data} = await api.execute({endpoint:ENDPOINTS.deleteSkill, criteria:[[criterion("id","=",id)]]});
        initialize();
    }

    return (
        <section>
            <h1>Skills</h1>

            <form onSubmit={handleSubmit} id={"newSkill"} className={STYLES.form}>
                <label htmlFor=":skill">Skill</label><input name=":skill" className={STYLES.input}/>
                <label htmlFor=":skill">Type</label><select name={":skillType"} className={STYLES.input}>
                    {Array.isArray(skillTypes)?
                        skillTypes.map(({id, type})=>(
                            <option value={id}>{type}</option>
                        )) :
                        <option>No values</option>
                    }
                </select>
                <label htmlFor=":skill">Level</label><select name={":level"} className={STYLES.input}>
                    {Array.isArray(skillLevels)?
                        skillLevels.map(({id,level})=>(
                            <option value={id}>{level}</option>
                        )) :
                        <option>No values</option>
                    }
                </select>
            </form>
            <ul>
                {Array.isArray(skills)? 
                    skills.map(({id, skill})=>(
                        <li>
                            {skill}
                            <button id={id} onClick={handleDelete} className={STYLES.negativeButton}>{ICONS.delete}</button>
                        </li>
                    )) :
                    <li>No Data</li>
                }
            </ul>
        </section>
    )
}