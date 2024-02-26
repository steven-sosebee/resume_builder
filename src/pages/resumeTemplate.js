import { useNavigate, useParams } from "react-router-dom"
import { useFetch, criterion, orderBy } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { createFormObject, isObjEmpty } from "../utils/utils";
import { ICONS } from "../data/iconClasses";
import { STYLES } from "../data/styleClasses";
import { ENDPOINTS } from "../data/endpoints";

// //template/:id
// const ENDPOINTS = {
//     getResume: "/resume/read",
//     createJob: "/job/create",
//     deleteJob: "/job/delete",
//     updateJob: "/job/update",
//     getJobs:"/job/getresumejobs",
//     linkJob: "/resume/addjob"

// }

const RESUMES = {
    endpoint:ENDPOINTS.Resume
}

const JOBS = {
    endpoint:ENDPOINTS.Jobs
}
export const ResumeTemplate = () => {
    const {id} = useParams();
    const api = useFetch();
    const [pageData, setPageData] = useState({template:{},jobs:[]});
    const [jobs, setJobs] = useState([]);
    const formRef = useRef(null);   
    const apiRESUMES = {...RESUMES,filterCriteria:[["id",id]]}
    const apiJOBS = {...JOBS, filterCriteria:[["resumeId",id]]}
    const initialize = async () => {
        
        const [
            {data:apiTemplate, status:status_template},
            {data:apiJobs, res, status:status_jobs}
         ] = await Promise.all([
            api.apiGet(apiRESUMES),
            api.apiGet(apiJOBS)
        ])
        // const {data:apiTemplate, status:status_template} = await api.execute({endpoint:ENDPOINTS.getResume, criteria:[[criterion("id", "=", id)]]});
        // const {data:apiJobs, res, status:status_jobs} = await api.execute({endpoint:ENDPOINTS.getJobs, ordered:[orderBy("end", false), orderBy("start", false)], criteria:[[criterion("resumeId", "=", id)]]});
        setPageData(()=>(apiTemplate[0]));
        setJobs(()=>(apiJobs));
        console.log(res);
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const inputs = new FormData(e.target);
        
        // console.log(formRef.current)
        inputs.append("resumeId",id);
        // console.log(createFormObject(inputs));
        // console.log(inputs);
        const apiOptions = {...JOBS, newValues:[createFormObject(inputs)]};
        const {data,status} = await api.apiInsert(apiOptions)
        // const {data, res, status} = await api.execute({endpoint:ENDPOINTS.linkJob, inputs:createFormObject(inputs)});
        console.log(data);
        if (status==200){
            formRef.current.reset();
            initialize();
            return
        };
        // console.log(res);
        // window.alert(`There was an error...`);
        
    }

    if (isObjEmpty(pageData.template)){
        return (<div>Loading</div>)
    }
    return (
        <section>
            <h1><span className="font-200">{pageData.template}</span></h1>
            <h3><span><a href="/templates">Back to applications...</a></span></h3>
            
            <form className={"bordered secondary"} onSubmit={handleSubmit} ref={formRef} id={"job"}>
                <div className="height-padding"><label htmlFor={"title"}>Title:</label><input className={STYLES.input} name="title"/></div>
                <div className="height-padding"><label htmlFor={"description"} >Description:</label><input className={STYLES.input} name="description"/></div>
                <div className="height-padding"><label htmlFor={"organization"} >Organization:</label><input className={STYLES.input} name="organization"/></div>
                <div className="height-padding"><label htmlFor={"start"} >Start Date:</label><input type={"date"} className={STYLES.input} name="start"/></div>
                <div className="height-padding"><label htmlFor={"end"} >End Data:</label><input type={"date"} className={STYLES.input} name="end"/></div>
                <button className={"right block inline-margin rounded action height-padding"} value={"submit"}>{ICONS.add}</button>
            </form>
            <ul>
                {jobs.map(
                    job => <Job key={job.id} updateData={initialize} job={job}/>
                )}
            </ul>
        </section>
    )
}

const Job = ({updateData, job}) => {
    // const statusClass = {
    //     active: "action",
    //     disabled: "disabled",
    //     inactive:"secondary"
    // }
    
    const api = useFetch();
    const [classState,setClass] = useState(STYLES.inactive);
    const [active, setActive] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const form = useForm(formRef.current);
    const [changed, setChanged] = useState(false);
    const disabled= active? null : "disabled";
    const {id, title, description, organization, resumeId, start, end} = job;
    const handleEdit = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        setActive(current => !current);
        setClass(STYLES.active);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setClass(STYLES.disabled);
        console.log(e.currentTarget.id);
        const {res, status} = await api.execute({endpoint:ENDPOINTS.deleteJob,criteria:[[criterion("id","=",id)]]})
        updateData();   
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        await handleUpdate()
    };

    const handleUpdate = async () => {
        let inputs = form.data();
        inputs.append(":resumeId",resumeId);
        const {res,status} = await api.execute({endpoint:ENDPOINTS.updateJob,inputs: form.createFormObject(inputs), criteria:[[criterion("id","=",id)]]});
        console.log(res);
    };

    const handleFocus = (e) => {
        if (active && !e.currentTarget.contains(e.relatedTarget)) {   
            setActive(false);
            setClass(STYLES.inactive);    
            if(changed) {
                handleUpdate();          
            }
        }        
    };

    const handleChange = (e) => {
        setChanged(true);
    };

    const handleAdd = (e) => {
        navigate(`/template/${id}`)
    }
    return (
        <li className={`secondary height-padding ${classState}`}>
            <form ref={formRef} id={"job"} onBlur={handleFocus}>
                <div>
                <input onChange={handleChange} disabled={disabled} className={`block font-200 x-90 ${classState}`} name=":title" defaultValue={title}/>
                <input onChange={handleChange} disabled={disabled} className={`block font-200 x-90 ${classState}`} name=":organization" defaultValue={organization}/>
                    
                </div>
                {/* <label htmlFor={":title"}>Title:</label> */}
                
                {/* <label htmlFor={":description"} >Description:</label> */}
                {/* <label htmlFor={":start"} >Start Date:</label> */}
                <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":start" defaultValue={start} type={"date"}/>
                {/* <label htmlFor={":end"} >End Data:</label> */}
                <span> to </span>
                <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":end" defaultValue={end} type={"date"}/>
                <textarea onChange={handleChange} disabled={disabled} className={`block x-90 ${classState}`} name=":description" defaultValue={description}/>
                <div className="height-spacing flex flex-around primary">
                    <button className={STYLES.formButton} id={id} value={"add"} onClick={handleAdd}>{ICONS.add}</button>
                    {active?
                        <button className={STYLES.formButton} id={id} value={"save"} onClick={handleSave}>{ICONS.save}</button> :    
                        <button className={STYLES.formButton} id={id} value={"edit"} onClick={handleEdit}>{ICONS.edit}</button>
                    }
                    <button className={STYLES.negativeButton} id={id} value={"delete"} onClick={handleDelete}>{ICONS.delete}</button>
                </div>
                
                
                
            </form>
        </li>
    )
}