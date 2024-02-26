import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
export const ResumeList = ({resumes}) => {
    return (
        <ul>
            {resumes.map(({name})=>(
                <li>{name}</li>
            ))}
        </ul>

    )
}