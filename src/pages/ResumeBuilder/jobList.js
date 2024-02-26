import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useArray } from "../../Hooks/useArray";
import { JobCard } from "./jobCard";

export const JobList = ({jobs, handleSubmit}) => {
jobs.sort((a,b)=>new Date(a.end) - new Date(b.end));


        return (
        <ul>
            {jobs.map((job,i)=>(
                <li>
                    <JobCard index={i} handleSubmit={handleSubmit} job={job}/>
                </li>
            ))}
        </ul>)
}