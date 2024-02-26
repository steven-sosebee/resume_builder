import { useEffect, useState } from "react";
import { useFetch } from "../../Hooks/useFetch"
import { ICONS } from "../../data/iconClasses";

export const ResumeList = () => {
    const api = useFetch();
    const endpoint = "/v1/pageData/resumeList";
    const [apiResumes, setAPIResumes] = useState([]);
    const initialize = async () => {
        const apiOptions = {
            endpoint:endpoint
        }
        const {data, status} = await api.apiGet(apiOptions);
        if (status==200){setAPIResumes(data)};
        console.log(data);
    }

    const handleDelete = async() =>{

    }

    const handleSelect = async() => {

    }

    useEffect(()=>{initialize()},[])
    return (
        <section>
            <h1>Resumes</h1>
            {apiResumes.map(({name, id, uuid})=>(
                    <li className="height-padding highlight">
                        <a href={`/resume/${uuid}`}><span>{name}</span> <span>{`(${uuid})`}</span></a>
                        <button className={"inline-margin"} onClick={handleSelect} id={id}>{ICONS.action}</button>
                        <button className={"inline-margin"} onClick={handleDelete} id={id}>{ICONS.delete}</button>
                    </li>
                ))}
        </section>
    )
}