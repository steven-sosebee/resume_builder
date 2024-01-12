import { useParams } from "react-router-dom"
import { criterion, useFetch } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../data/endpoints";
import { STYLES } from "../data/styleClasses";
import { ICONS } from "../data/iconClasses";
import { createFormObject } from "../utils/utils";

export const Skill = () => {
    const {id} = useParams();
    const api = useFetch();
    const [skill, setSkill] = useState();
    const [activities, setActivities] = useState();
    const form = useRef();

    const initialize = async () => {
        const {data} = await api.execute({endpoint:ENDPOINTS.getSkills,criteria:[[criterion("id","=",id)]]});
        console.log(data[0]);
        setSkill(data[0]);
    }
    useEffect(()=>{
        initialize();
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = new FormData(e.currentTarget);
        input.append(":skillId",id);
        // console.log(createFormObject(input));
        const {data} = await api.execute({endpoint:ENDPOINTS.activityLinkSkill, inputs:createFormObject(input)});
        console.log(data);

    }

    return (
        <section>
            <h1>{skill?.skill}</h1>
            <form ref={form} className={STYLES.form} onSubmit={handleSubmit}>
                <label htmlFor=":activity"></label><input className={STYLES.input} name={":activity"}/>
                <button type="submit" className={STYLES.submitButton}>{ICONS.add}</button>
            </form>
        </section>
    )
}