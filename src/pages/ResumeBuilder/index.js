import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../../Hooks/useFetch"
import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { ResumeForm } from "./resumeForm";
import { JobForm } from "./jobForm";
import { useDialog } from "../../Hooks/useDialog";
import { SkillForm } from "./skillForm";
import { JobList } from "./jobList";
import { SkillList } from "./skillList";

// const ResumeContext = createContext();

// url: /resume/builder/

export const ResumeBuilder = () => {
    const api = useFetch();
    const [jobs,setJobs] = useState([]);
    const [resume, setResume] = useState([]);
    const [skills,setSkills] = useState([]);
    const [apiResumes, setAPIResumes] = useState([]);
    const [apiSkills, setAPISkills] = useState([]);
    const [apiJobs, setAPIJobs] = useState([]);
    const [dialogState,setDialogState] = useState('empty');
    const pageEndpoint = "/v1/pageData/resumeBuilder"
    const formDialog = useDialog();
    
    const dialogOptions = {
        empty:<div>Please select a form</div>,
        jobs:<JobForm selected={jobs} data={apiJobs} updateData={setAPIJobs} closeDialog={()=>formDialog.close()} handleSubmit={setJobs}/>,
        skills:<SkillForm selected={skills} data={apiSkills} updateData={setAPISkills} closeDialog={()=>formDialog.close()} handleSubmit={setSkills}/>
    };

    const getTemplates = async () => {
        const apiOptions = {
            endpoint:pageEndpoint,
        }
        
        const {data} = await api.apiGet(apiOptions);
        setAPIResumes(data.resumes);
        setAPISkills(data.skills);
        setAPIJobs(data.jobs);
        console.log(data);
    }

    useEffect(()=>{
        getTemplates();
    },[]);

    const saveTemplate = async (e) => {
        e.preventDefault();
        const apiOptions = {
            endpoint:"/v1/pageData/resumeBuilder",
            newValues:{
                resume:{
                    jobs:jobs,
                    skills:skills
                },
                title:resume.name
            }
        };
        const {data, res} = await api.apiInsert(apiOptions);
        console.log(res);
        // console.log(apiOptions);
    }
    
    const setCurrentResume =(e)=>{
        const index = e.target.value;
        const {jobs, skills, name}=apiResumes[index].resume;
        setJobs(jobs);
        setSkills(skills);
        setResume(apiResumes[index].name);
        
    }
    return (
        <div>
            <formDialog.Window>
                {dialogOptions[dialogState]}
            </formDialog.Window>
            
            <h1>Create new resume template</h1>
            <ResumeForm data={resume} handleSubmit={setResume}/>
            <h1>Choose an Existing Template:</h1>
            <select onChange={setCurrentResume}>
                {apiResumes.map(({resume, name},index)=>(
                    <option value={index}>{name}</option>
                ))}
            </select>
            <button className={STYLES.formButton} onClick={(e)=>{setDialogState('jobs');formDialog.toggleDialog()}}>Jobs</button>
            <button className={STYLES.formButton} onClick={(e)=>{setDialogState('skills');formDialog.toggleDialog()}}>Skills</button>
            <button className={STYLES.formButton} onClick={(e)=>{setDialogState('questions');formDialog.toggleDialog()}}>Add Application Question</button>
            <JobList handleSubmit={setJobs} jobs={jobs}/>
            
            <SkillList handleSubmit={setSkills} skills={skills}/>
            
            <button onClick={saveTemplate}>{ICONS.save}</button>
        </div>
    )
}