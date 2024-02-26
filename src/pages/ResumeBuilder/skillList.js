import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useArray } from "../../Hooks/useArray";
import { JobCard } from "./jobCard";
import { SkillCard } from "./skillCard";

export const SkillList = ({skills, handleSubmit}) => {
// skills.sort((a,b)=>new Date(a.end) - new Date(b.end));

console.log(skills);

if (skills.length==0){
    return (<></>);
}
        return (
        <section>
            <h1>Skills</h1>
            <ul>
                {skills.map((skill,i)=>(
                    <li key={skill.id}>
                        <SkillCard index={i} handleSubmit={handleSubmit} data={skill}/>
                    </li>
                ))}
            </ul>
        </section>
        )

}