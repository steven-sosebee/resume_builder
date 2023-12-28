import { useNavigate, useParams } from "react-router-dom"
import { useFetch, criterion, orderBy } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { createFormObject, isObjEmpty } from "../utils/utils";
import { ICONS } from "../data/iconClasses";

// /testing/template/:id
export const ResumeTemplate = () => {
    const {id} = useParams();
    const api = useFetch();
    const [pageData, setPageData] = useState({template:{},jobs:[]});
    const [jobs, setJobs] = useState([]);
    const formRef = useRef(null);
    // const jobForm = useForm(formRef.current);
    console.log(formRef);

    const initialize = async () => {
        
        const {data:apiTemplate, status:status_template} = await api.execute({endpoint:"/api/resume/select", criteria:[[criterion("id", "=", id)]]});
        const {data:apiJobs, res, status:status_jobs} = await api.execute({endpoint:"/api/job/getresumejobs", ordered:[orderBy("end", false), orderBy("start", false)], criteria:[[criterion("resumeId", "=", id)]]});
        setPageData(()=>(apiTemplate[0]));
        setJobs(()=>(apiJobs));
        console.log(res);
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const inputs = new FormData(formRef.current);
        
        // console.log(formRef.current)
        inputs.append(":resumeId",id);
        // console.log(createFormObject(inputs));
        // console.log(inputs);
        const {data, res, status} = await api.execute({endpoint:"/api/resume/addjob", inputs:createFormObject(inputs)});
        
        if (status==200 && parseInt(data.ID)>0){
            formRef.current.reset();
            initialize();
            return
        };
        // console.log(res);
        window.alert(`There was an error...`);
        
    }

    

    if (isObjEmpty(pageData.template)){
        return (<div>Loading</div>)
    }
    return (
        <section>
            <h1>Resume Template: {id}</h1>
            {pageData.template.template}
            
            <form onSubmit={handleSubmit} className={"secondary"} ref={formRef} id={"job"}>
                <div><label htmlFor={":title"}>Title:</label><input className={"primary"} name=":title"/></div>
                <div><label htmlFor={":description"} >Description:</label><input className={"primary"} name=":description"/></div>
                <div><label htmlFor={":start"} >Start Date:</label><input type={"date"} className={"primary"} name=":start"/></div>
                <div><label htmlFor={":end"} >End Data:</label><input type={"date"} className={"primary"} name=":end"/></div>
                <button onClick={handleSubmit}>Submit</button>
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
    const statusClass = {
        active: "action",
        disabled: "disabled",
        inactive:"secondary"
    }
    
    const api = useFetch();
    const [classState,setClass] = useState(statusClass.inactive);
    const [active, setActive] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const form = useForm(formRef.current);
    const [changed, setChanged] = useState(false);
    const disabled= active? null : "disabled";
    const {id, title, description, resumeId, start, end} = job;
    const handleEdit = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        setActive(current => !current);
        setClass(statusClass.active);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setClass(statusClass.disabled);
        console.log(e.currentTarget.id);
        const {res, status} = await api.execute({endpoint:"/api/job/delete",criteria:[[criterion("id","=",id)]]})
        updateData();   
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        await handleUpdate()
    };

    const handleUpdate = async () => {
        let inputs = form.data();
        inputs.append(":resumeId",resumeId);
        const {res,status} = await api.execute({endpoint:"/api/job/update",inputs: form.createFormObject(inputs), criteria:[[criterion("id","=",id)]]});
        console.log(res);
    };

    const handleFocus = (e) => {
        if (active && !e.currentTarget.contains(e.relatedTarget)) {   
            setActive(false);
            setClass(statusClass.inactive);    
            if(changed) {
                handleUpdate();          
            }
        }        
    };

    const handleChange = (e) => {
        setChanged(true);
    };

    const handleAdd = (e) => {
        navigate(`/template/${resumeId}/${id}`)
    }
    return (
        <li className={`secondary ${classState}`}>
            <form ref={formRef} id={"job"} onBlur={handleFocus}>
                <div>
                    <button id={id} value={"delete"} onClick={handleDelete}><i className={ICONS.delete}></i></button>
                    {active?
                        <button id={id} value={"save"} onClick={handleSave}><i className={ICONS.save}></i></button> :    
                        <button id={id} value={"edit"} onClick={handleEdit}><i className={ICONS.edit}></i></button>
                    }
                </div>
                {/* <label htmlFor={":title"}>Title:</label> */}
                <input onChange={handleChange} disabled={disabled} className={`block x-90 ${classState}`} name=":title" defaultValue={title}/>
                {/* <label htmlFor={":description"} >Description:</label> */}
                {/* <label htmlFor={":start"} >Start Date:</label> */}
                <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":start" defaultValue={start} type={"date"}/>
                {/* <label htmlFor={":end"} >End Data:</label> */}
                <span> to </span>
                <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":end" defaultValue={end} type={"date"}/>
                <textarea onChange={handleChange} disabled={disabled} className={`block x-90 ${classState}`} name=":description" defaultValue={description}/>
                <button className={"block"} id={id} value={"add"} onClick={handleAdd}><i className={ICONS.add}></i></button>
                
                
                
            </form>
        </li>
    )
}