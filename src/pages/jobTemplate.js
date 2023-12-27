import { useNavigate, useParams } from "react-router-dom"
import { useFetch, criterion, orderBy } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { isObjEmpty } from "../utils/utils";
import { ICONS } from "../data/iconClasses";

// /template/:id/:jobid
const ENDPOINTS = {
    getJob: "/api/job/select",
    getLinkedActivities: "/api/activity/select",
    linkActivity:"/api/activity/add",
    unlinkActivity:"/api/activity/delete",
    update:"/api/activity/update"

}

export const JobTemplate = () => {
    const navigate = useNavigate();
    const {id, jobId} = useParams();
    const api = useFetch();
    const [pageData, setPageData] = useState({});
    const [activities, setActivities] = useState([]);
    const formRef = useRef();
    const activityForm = useForm(formRef.current);
    // console.log(id,jobId);
   
    const initialize = async () => {
        
        const {data:apiTemplate, status:status_template} = await api.execute({
            endpoint:ENDPOINTS.getJob, 
            criteria:[[criterion("id", "=", jobId)]]
        });

        const {data:apiActivities, res, status:status_jobs} = await api.execute({
            endpoint:ENDPOINTS.getLinkedActivities, 
            // ordered:[orderBy("end", false), orderBy("start", false)], 
            criteria:[[criterion("jobId", "=", jobId)]]
        });
        
        setPageData(()=>(apiTemplate[0]));
        setActivities(()=>(apiActivities));
        console.log(apiTemplate[0]);
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let inputs = activityForm.data();
        inputs.append(":jobId",jobId);

        // console.log(activityForm.createFormObject(inputs));
        const {res, status} = await api.execute({endpoint:ENDPOINTS.linkActivity, inputs:activityForm.createFormObject(inputs)});
        if (status==200){
            formRef.current.reset();
            initialize();
            return
        };
        window.alert(`There was an error: ${res}`);
        
    }

    const backToResume = () => {
        navigate(`/template/${id}`);
    };

    if (isObjEmpty(pageData)){
        return (<div>Loading</div>)
    }
    return (
        <section>
            <h1>Job Template: {pageData.title}</h1>
            <button onClick={backToResume}>Back to resume...</button>
            
            <form onSubmit={handleSubmit} className={"secondary"} ref={formRef} id={"job"}>
                {/* <label htmlFor={":title"}>Title:</label><input className={"primary"} name=":title"/> */}
                <label htmlFor={":description"} >Description:</label><input className={"primary"} name=":description"/>
                {/* <label htmlFor={":start"} >Start Date:</label><input type={"date"} className={"primary"} name=":start"/> */}
                {/* <label htmlFor={":end"} >End Data:</label><input type={"date"} className={"primary"} name=":end"/> */}
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <ul>
                {activities.map(
                    activity => <Activity key={activity.id} updateData={initialize} activity={activity}/>
                )}
            </ul>
        </section>
    )
}

const Activity = ({updateData, activity}) => {
    const statusClass = {
        active: "action",
        disabled: "disabled",
        inactive:"secondary"
    }
    
    const api = useFetch();
    const [classState,setClass] = useState(statusClass.inactive);
    const [active, setActive] = useState(false);
    const formRef = useRef();
    const form = useForm(formRef.current);
    const [changed, setChanged] = useState(false);
    const disabled= active? null : "disabled";
    const {id, jobId, description, activityType} = activity;
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
        const {res, status} = await api.execute({endpoint:ENDPOINTS.unlinkActivity,criteria:[[criterion("id","=",id)]]})
        updateData();   
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        await handleUpdate()
    };

    const handleUpdate = async () => {
        let inputs = form.data();
        inputs.append(":jobId",jobId);
        const {res,status} = await api.execute({endpoint:ENDPOINTS.update,inputs: form.createFormObject(inputs), criteria:[[criterion("id","=",id)]]});
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
        
    }
    return (
        <li className={`secondary ${classState}`}>
            <form ref={formRef} id={"job"} onBlur={handleFocus}>
                <textarea onChange={handleChange} disabled={disabled} className={`x-90 ${classState}`} name=":description" defaultValue={description}/>
                <div className={""}>    
                    <button className={""} id={id} value={"delete"} onClick={handleDelete}><i className={ICONS.delete}></i></button>
                    {active?
                        <button id={id} value={"save"} onClick={handleSave}><i className={ICONS.save}></i></button> :    
                        <button id={id} value={"edit"} onClick={handleEdit}><i className={ICONS.edit}></i></button>
                    }
                </div>
                {/* <label htmlFor={":title"}>Title:</label> */}
                {/* <input onChange={handleChange} disabled={disabled} className={`block ${classState}`} name=":title" defaultValue={title}/> */}
                {/* <label htmlFor={":description"} >Description:</label> */}
                {/* <label htmlFor={":start"} >Start Date:</label> */}
                {/* <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":start" defaultValue={start} type={"date"}/> */}
                {/* <label htmlFor={":end"} >End Data:</label> */}
                {/* <span> to </span> */}
                {/* <input onChange={handleChange} disabled={disabled} className={`x-30 ${classState}`} name=":end" defaultValue={end} type={"date"}/> */}
                
                {/* <button className={"block"} id={id} value={"add"} onClick={handleAdd}><i className={ICONS.add}></i></button> */}
                
                
                
            </form>
        </li>
    )
}