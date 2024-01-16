import { useEffect, useState } from "react"
import { STYLES } from "../data/styleClasses"
import { criterion, useFetch } from "../Hooks/useFetch"
import { ENDPOINTS } from "../data/endpoints";
import { createFormObject, groupBy } from "../utils/utils";
import { ICONS } from "../data/iconClasses";
import { useNavigate } from "react-router-dom";

export const Skills = () => {
    const api = useFetch();
    const [skills, setSkills] = useState([])
    const [skillTypes, setSkillTypes] = useState([]);
    const [skillLevels, setSkillLevels] = useState([]);
    const navigate = useNavigate();

    const SKILLS = {
        endpoint: ENDPOINTS.Skill
    }
    const SKILLTYPES = {
        endpoint: ENDPOINTS.SkillTypes
    }
    const SKILLLEVELS = {
        endpoint: ENDPOINTS.SkillLevels
    }
    const initialize = async () => {
        const calls = await Promise.all(
            [
                api.apiGet(SKILLS),
                api.apiGet(SKILLTYPES),
                api.apiGet(SKILLLEVELS),
            ]
        );
        
        // const callIDs = ['Skills',"SkillTypes","SkillLevels"];
        // const obj = calls.map((call,i)=>({[callIDs[i]]:call.data}))
        // console.log(obj);
        // let groupedSkills;
        // groupBy(apiSkills,"skillType",groupedSkills);
        // console.log(apiSkills);
        setSkills(calls[0].data);
        setSkillTypes(calls[1].data);
        setSkillLevels(calls[2].data);
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

    const handleEdit = async (e) => {

    }

    const handleExpand = async (e) => {
        const id = e.currentTarget.id;
        navigate(`/skill/${id}`);
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
                <button type="submit" className={STYLES.submitButton}>{ICONS.add}</button>
            </form>
            <ul>
                {Array.isArray(skills)? 
                    skills.map(({id, skill})=>(
                        <li>
                            {skill}
                            <button id={id} onClick={handleDelete} className={STYLES.negativeButton}>{ICONS.delete}</button>
                            <button id={id} onClick={handleEdit} className={STYLES.negativeButton}>{ICONS.edit}</button>
                            <button id={id} onClick={handleExpand} className={STYLES.negativeButton}>{ICONS.expand}</button>
                        </li>
                    )) :
                    <li>No Data</li>
                }
            </ul>
        </section>
    )
}