import { useParams } from "react-router-dom"
import { criterion, useFetch } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { createFormObject, isObjEmpty } from "../utils/utils";
import { STYLES } from "../data/styleClasses";
import { ICONS } from "../data/iconClasses";
import { ENDPOINTS } from "../data/endpoints";

// const ENDPOINTS = {
//     getApplication: "/application/read",
//     getResumeTemplates: "/resume/read",
//     getQualifications: "/qualification/read",
//     linkTemplate: "/application/createresume",
//     unlinkTemplate: "/resume/delete",
//     getTemplateJobs: "/job/read",
//     getJobActivities: "/activity/read",
//     updateApplication: "/application/update",
//     testing:"/application/singleinput",
//     createQualification: "/qualification/create",
//     deleteQualification: "/qualification/delete"
// };

const STATUS = {
    Unsubmitted: 0,
    Pending:1,
    Rejected:2,
    Interview:3,
    "Pending Response":4
}

export const Application = () => {
    const {id} = useParams();
    const api = useFetch();
    const [application, setApplication] = useState();
    const [templates, setTemplates] = useState();
    const [activeTemplate, setActiveTemplate] = useState();
    const [qualifications, setQualifications] = useState();

    const handleDisplayResume = async (resumeId) => {
        const {data, status} = await api.execute({endpoint:ENDPOINTS.getResume,criteria:[[criterion("id","=",resumeId)]]});
        const {data:jobs} = await api.execute({endpoint:ENDPOINTS.getTemplateJobs,criteria:[[criterion("resumeId","=",resumeId)]]});

        const activities = jobs.map(({id}) => {

        })
        setActiveTemplate({resume:data[0],jobs:jobs});
    };

    const initialize = async () => {
        const {data: apiApplication, status: applicationStatus} = await api.execute({endpoint: ENDPOINTS.getApplication, criteria:[[criterion("id","=",id)]]});
        const {data: apiQualifications, status: qualificationStatus} = await api.execute({endpoint:ENDPOINTS.getQualification});
        const {data: apiApplicationTemplate,status:applicationTemplateStatus} = await api.execute({endpoint: ENDPOINTS.getResume, criteria:[[criterion("applicationId","=",id)]]});
        // console.log(apiApplicationTemplate);
        if ([applicationStatus, applicationTemplateStatus,qualificationStatus].every(status =>status==200)){
            setApplication(apiApplication[0]);
            setQualifications(apiQualifications);
            if(isObjEmpty(apiApplicationTemplate[0])){
                const {data: apiTemplates, status: templateStatus} = await api.execute({endpoint:ENDPOINTS.getResume});    
                setTemplates(apiTemplates);
                return
            }
            handleDisplayResume(apiApplicationTemplate[0].id)    
        };


    }

    useEffect(()=> {
        initialize();
    },[])

    const handleSelectTemplate = async (e) => {
        const resumeId = activeTemplate.resume.id;
        const inputs = {":applicationid":parseInt(id), ":template": application.title};

        const {data, status} = await api.execute({endpoint:ENDPOINTS.linkTemplate,inputs:inputs,criteria:[[criterion("resumeId","=",resumeId)]]});
        console.log(data);
    }

    const handleDeselectTemplate = async (e) => {
        const resumeId = activeTemplate.resume.id;
        const inputs = {":id":resumeId};
        console.log(inputs);
        const {data, status} = api.execute({endpoint:ENDPOINTS.unlinkTemplate,criteria:[[criterion("id","=",resumeId)]]});
        if (status==200) {
            setActiveTemplate(null);
        }
        initialize();
    }

    const handleSelect = async (e) => {
        // console.log(e.target.value);
        const resumeId = e.currentTarget.value;
        // const {data, status} = await api.execute({endpoint:ENDPOINTS.getApplication,criteria:[[criterion("id","=",resumeId)]]});
        // const {data:jobs} = await api.execute({endpoint:ENDPOINTS.getTemplateJobs,criteria:[[criterion("resumeId","=",resumeId)]]});

        handleDisplayResume(resumeId);
        
        // setActiveTemplate({resume:data[0],jobs:jobs});
        
    }

    const handleChange = async (e) => {
        const {name, value} = e.target;
        // console.log({[name]:value});
        const data = await api.execute({endpoint:ENDPOINTS.testing,inputs:{[name]:value}, criteria:[[criterion("id","=",id)]]});
        console.log(data);
    }

    if (isObjEmpty(application)){
        return (<div>Loading</div>)
    }

    const qualificationSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        form.append(":qualificationType",0);
        form.append(":applicationId",id);
        const {data} = await api.execute({endpoint:ENDPOINTS.createQualification,inputs:createFormObject(form)});
        const {data:newQualifications} = await api.execute({endpoint:ENDPOINTS.getQualifications});
        setQualifications(newQualifications);
    }

    const qualificationDelete = async (e) => {
        const id = e.currentTarget.id;
        
        const {data} = await api.execute({endpoint:ENDPOINTS.deleteQualification, criteria:[[criterion("id","=",id)]]});
        const {data:newQualifications} = await api.execute({endpoint:ENDPOINTS.getQualifications});
        setQualifications(newQualifications);
    }

    return (
        <div>
            Application Details <span className="block">{application.title}</span>

            <p><span><a href="/applications">Back to applications...</a></span></p>

            {/* Status Selector */}
            <label htmlFor=":status">Status:</label><select onChange={handleChange} name=":status" className={STYLES.form}>
                {Object.entries(STATUS).map(([key,value], index)=>(
                    
                    <option value={value}>{key}</option>
                ))}
                </select>           
                   {/* Template Selector  */}
            
                
                {Array.isArray(templates)?
                    <>
                        <select className={STYLES.form} onChange={handleSelect}>
                            <option value={-1}>Choose a template:</option>
                            {templates.map(({template, id})=><option value={id}>{template}</option>)}
                        </select>
                        <button onClick={handleSelectTemplate} className={STYLES.formButton}>{ICONS.add}</button>
                    </>:
                    <button onClick={handleDeselectTemplate}>Discard Template {ICONS.delete}</button>
                }
            

            {Array.isArray(activeTemplate?.jobs)? 
                activeTemplate.jobs.map(({title, organization, description})=>(
                    <li>
                        <p>{title}</p>
                        <p>{organization}</p>
                    </li>
                )) :
                <></>
            }

            <section>
                <form onSubmit={qualificationSubmit}>
                    <label htmlFor=":qualification">Qualifications</label><input name=":qualification" className={STYLES.input}/>
                </form>
                <ul>
                    {Array.isArray(qualifications)?
                        qualifications.map(({id, qualification,qualificationType})=>(
                        <li>
                            <p>{qualification}</p><button id={id} onClick={qualificationDelete} className={STYLES.formButton}>{ICONS.delete}</button>
                        </li>
                    )) :
                    <></>
                }
                </ul>
            </section>
        </div>
    )
}