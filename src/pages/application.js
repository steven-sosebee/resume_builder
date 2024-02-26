import { useParams } from "react-router-dom"
import { criterion, useFetch } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { createFormObject, isObjEmpty } from "../utils/utils";
import { STYLES } from "../data/styleClasses";
import { ICONS } from "../data/iconClasses";
import { ENDPOINTS } from "../data/endpoints";
import { Dialog } from "../components/dialog";
import { Skills } from "./skills";
import { TextArea } from "./spacing";

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


const QUALIFICATIONS = {
    endpoint:ENDPOINTS.ApplicationQualifications
}
const QUALIFICATIONACTIVITIES = {
    endpoint:ENDPOINTS.QualificationActivities
}

export const Application = () => {
    const {id} = useParams();
    const api = useFetch();
    const [application, setApplication] = useState();
    const [templates, setTemplates] = useState();
    const [activeTemplate, setActiveTemplate] = useState();
    const [qualifications, setQualifications] = useState();
    const [skills, setSkills] = useState();
    const skillRef = useRef();

    const APPLICATION = {
        endpoint:ENDPOINTS.Application,
        filterCriteria: [["id",id]]
    }
    
    const LINKEDQUALIFICATIONS = {
        endpoint:ENDPOINTS.ApplicationQualifications,
        filterCriteria: [["applicationId",id]]
    }

    
    const SKILLS = {
        endpoint: ENDPOINTS.Skill
    }

    const LINKEDRESUME = {
        endpoint:ENDPOINTS.Resume,
        filterCriteria: [["applicationId",id]]
    }

    const handleDisplayResume = async (resumeId) => {
        // const {data, status} = await api.execute({endpoint:ENDPOINTS.getResume,criteria:[[criterion("id","=",resumeId)]]});
        // const {data:jobs} = await api.execute({endpoint:ENDPOINTS.getTemplateJobs,criteria:[[criterion("resumeId","=",resumeId)]]});
        
        // const activities = jobs.map(({id}) => {

        // })
        // setActiveTemplate({resume:data[0],jobs:jobs});
    };

    const initialize = async () => {
        // const {data: apiApplication, status: applicationStatus} = await api.apiGet(APPLICATION);
        // const {data: apiQualifications, status: qualificationStatus} = await api.apiGet(LINKEDQUALIFICATIONS);
        // const {data: apiSkills, status:skillsStatus} = await api.apiGet(SKILLS);
        // const {data: apiApplicationTemplate,status:applicationTemplateStatus} = await api.apiGet(LINKEDRESUME);

        const [
            {data: apiApplication, status: applicationStatus},
            {data: apiQualifications, status: qualificationStatus},
            {data: apiSkills, status:skillsStatus},
            {data: apiApplicationTemplate,status:applicationTemplateStatus}
        ]= await Promise.all(
            [
                api.apiGet(APPLICATION),
                api.apiGet(LINKEDQUALIFICATIONS),
                api.apiGet(SKILLS),
                api.apiGet(LINKEDRESUME)
            ]
        );
        
        // const {data: apiApplication, status: applicationStatus} = await api.execute({endpoint: ENDPOINTS.getApplication, criteria:[[criterion("id","=",id)]]});
        // const {data: apiQualifications, status: qualificationStatus} = await api.execute({endpoint:ENDPOINTS.getQualifications, criteria:[[criterion("applicationId","=",id)]]});
        // const {data: apiSkills, status:skillsStatus} = await api.execute({endpoint:ENDPOINTS.getSkills});
        // console.log(apiSkills);
        // const {data: apiApplicationTemplate,status:applicationTemplateStatus} = await api.execute({endpoint: ENDPOINTS.getResume, criteria:[[criterion("applicationId","=",id)]]});
        // console.log(apiApplicationTemplate);

        // if (calls.every(call =>call.status==200)){
            setApplication(apiApplication[0]);
            setQualifications(apiQualifications);
            setSkills(apiSkills);
            if(isObjEmpty(apiApplicationTemplate[0])){
                const {data: apiTemplates, status: templateStatus} = await api.apiGet({endpoint:ENDPOINTS.Resume});    
                setTemplates(apiTemplates);
                return
            }
            handleDisplayResume(apiApplicationTemplate[0].id)    
        // };


    }

    useEffect(()=> {
        initialize();
    },[])

    const handleSelectTemplate = async (e) => {
        const resumeId = activeTemplate.resume.id;
        const inputs = {"applicationid":parseInt(id), "template": application.title};

        const apiOptions = {}
        // const {data} = await api.apiInsert(linkResumeTemplate)
        // const {data, status} = await api.execute({endpoint:ENDPOINTS.linkTemplate,inputs:inputs,criteria:[[criterion("resumeId","=",resumeId)]]});
        // console.log(data);
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
        const apiOptions = {...QUALIFICATIONS};
        const form = new FormData(e.target);
        const quals = form.get("qualification");
        
        const qualificationArray = quals.split("\n");
        apiOptions.newValues =
        qualificationArray.map(qual=>(
            {
                qualificationType: 0,
                applicationId:id,
                qualification: qual
            }
        ));
        
        // e.target.reset();
        // const {data} = await api.execute({endpoint:ENDPOINTS.createQualifications,inputs:input});
        const {data} = await api.apiInsert(apiOptions);
        // console.log(data);
        // const {data:newQualifications}
        // const {data: newQualifications} = await api.execute({endpoint:ENDPOINTS.getQualifications, criteria:[[criterion("applicationId","=",id)]]});
        const {data: newQualifications, status: qualificationStatus} = await api.apiGet(LINKEDQUALIFICATIONS);
        setQualifications(newQualifications);
    
    }

    // const qualificationDelete = async (e) => {
    //     const id = e.currentTarget.id;
        
    //     const {data} = await api.execute({endpoint:ENDPOINTS.deleteQualification, criteria:[[criterion("id","=",id)]]});
        
    // }

    const openDialog = (e)=> {
        // console.log(e.target);
        // console.log(e.target.children[0]);
        skillRef.current.showModal();
    
    }

    return (
        <div>
            Application Details <span className="block">{application.title}</span>

            <p><span><a href="/applications">Back to applications...</a></span></p>

            {/* Status Selector */}
            <label htmlFor="status">Status:</label><select onChange={handleChange} name="status" className={STYLES.form}>
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
            <button onClick={openDialog}>Add Skill</button>
            <dialog ref={skillRef}>
                    <button onClick={(e)=>skillRef.current.close()} className={STYLES.negativeButton}>{ICONS.close}</button>
                    <Skills/>
                </dialog>
                {/* <TextArea/> */}
                <form onSubmit={qualificationSubmit}>
                    <label htmlFor="qualification">Qualifications</label><textarea name="qualification" className={STYLES.input}/>
                    <button type="submit" className={STYLES.submitButton}>{ICONS.add}</button>
                </form>
                
                <ul>
                    {Array.isArray(qualifications)?
                        qualifications.map((qualification,i)=>(
                        <li>
                            <Qualification applicationId={id} qual={qualification} skills={skills}/>
                            {/* <p>{qualification}</p>
                            <button id={id} onClick={qualificationDelete} className={STYLES.formButton}>{ICONS.delete}</button>
                            <select name={":skillId"}>
                                {Array.isArray(skills)?
                                    skills.map(({skill,id})=>(
                                        <option value={id}>{skill}</option>
                                    )) :
                                    <option>Choose a skill</option>
                                }
                                
                            </select> */}
                            
                            
                        </li>
                    )) :
                    <></>
                }
                </ul>
                
            </section>
        </div>
    )
}

const Qualification = ({qual, skills, applicationId}) => {
    // const {activities: linkedActivities, skills: linkedSkills} = qual;
    // const {id:skillId} = skills;
    const api = useFetch();
    const [qualification,setQualification] = useState(qual.qualification);
    const [linkedSkill, setLinkedSkill] = useState(qual.skills);
    const [linkedActivity, setLinkedActivities] = useState(qual.activities);
    
    // const [openSkill, setOpenSkill] = useState(" hidden");
    const skillSelect = useRef();

    const refreshSkills = async () => {
        const apiOptions = {...QUALIFICATIONS,filterCriteria:[["id",qualification.id]]};
        // const {data} = await api.execute({endpoint:ENDPOINTS.getLinkedSkills, criteria:[[criterion("qualificationId","=",id)]]});
        const {data:{skills}} = await api.apiGet(apiOptions);
        // setLinkedSkill(data);
        console.log(skills);

    }
    const refreshActivities = async () => {
        const apiOptions = {...QUALIFICATIONS,filterCriteria:[["id",qualification.id]]};
        // const {data} = await api.execute({endpoint:ENDPOINTS.getLinkedSkills, criteria:[[criterion("qualificationId","=",id)]]});
        const {data:{activities}} = await api.apiGet(apiOptions);
        setLinkedSkill(activities);
        console.log(activities);

    }
    const updateQualification = async (e) => {
        const apiOptions = {...QUALIFICATIONS};
        const input = {qualificationId: qualification.id, skillId: parseInt(e.target.value)};
        apiOptions.newValues=input;
        const {data} = await api.apiUpdate(apiOptions);
        // const {data} = await api.execute({endpoint:ENDPOINTS.linkSkill,inputs:input});
        // console.log(data);
        // initialize();
    }

    useEffect(()=>{
        // initialize();
    },[])

    const handleActivity = async (e) => {
        e.preventDefault();
        const apiOptions = {...QUALIFICATIONACTIVITIES};
        // console.log(e.target);
        const inputs = createFormObject(new FormData(e.target));
        // inputs.activityId = applicationId;
        inputs.qualificationId = qualification.id;
        apiOptions.newValues = [inputs];
        const {data} = await api.apiInsert(apiOptions);
        console.log(data);
        refreshActivities();


    }

    return (
        <article>
            <p>{qualification.qualification}</p>
            {/* <button id={id} onClick={qualificationDelete} className={STYLES.formButton}>{ICONS.delete}</button> */}
            <form onSubmit={handleActivity} id={"activityForm"}>
                <lable>Add Activity:</lable><input name={"activity"} className={STYLES.input}/><button type="submit" className={STYLES.submitButton} >{ICONS.add}</button>
            </form>

            
            <select ref ={skillSelect} className={STYLES.input} onChange={updateQualification} name={":skillId"}>
                {Array.isArray(skills)?
                    
                    skills.map(({skill,id})=>(
                        <option key={id} value={id}>{skill}</option>
                    )) :
                    <option></option>
                }
            
            </select>
            <ul className={"secondary"}>
                {Array.isArray(linkedSkill)?
                    linkedSkill.map(({skill, id})=>(
                        <li>
                            {skill}
                        </li>
                    )):
                    <></>
                }
            </ul>
            <ul className={"secondary"}>
                {Array.isArray(linkedActivity)?
                    linkedActivity.map(({activity, id})=>(
                        <li id={id}>
                            {activity}
                        </li>
                    )):
                    <></>
                }
            </ul>
            </article>
                            
                            
    )
}