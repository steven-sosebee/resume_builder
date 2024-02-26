import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch"
import { useEffect, useState } from "react";
import { JobCard } from "./jobCard";
import { SkillCard } from "./skillCard";

export const ApplicationResume = () => {
    const {uuid} = useParams();
    const api = useFetch();
    const [data, setData] = useState({name:"Loading",resume:{jobs:[],skills:[]}});

    const apiOptions = {
        endpoint:"/v1/pageData/resume",
        filterCriteria:[['uuid',uuid]]
    }   

    const getData = async () => {
        const {data} = await api.apiGet(apiOptions);
        const resume = data[0].resume;

        setData({name:data[0].name, resume:JSON.parse(resume)});
    }
    useEffect(()=>{
        getData()},[]
    )
    console.log(data);
    return (
        <section >
            <section className="secondary bordered">
                <h1>{data?.name}</h1>
                <h2>Skills</h2>
                <ul>
                    {data?.resume?.skills.map((skill)=>(
                        <li><SkillCard data={skill}/></li>
                    ))}
                </ul>
            </section>
            <section className="secondary bordered">
                <h2>Work History</h2>
                <ul>
                    {data?.resume?.jobs.map((job)=>(
                        <li><JobCard job={job}/></li>
                    ))}
                </ul>
            </section>
        </section>
    )
}