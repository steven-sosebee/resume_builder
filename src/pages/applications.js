import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch, criterion } from "../Hooks/useFetch";
import { STYLES } from "../data/styleClasses";
import { createFormObject } from "../utils/utils";
import { ICONS } from "../data/iconClasses";
import { ENDPOINTS } from "../data/endpoints";

// const ENDPOINTS = {
//     getApplications: "/application/read",
//     addApplication: "/application/create",
//     deleteApplication: "/application/delete",
//     updateApplication: "/application/update"

// }

const formFields = [
    {
        field:"title",
        type:"text",
        label:"Title:"
    },
    {
        field:"organization",
        type:"text",
        label:"Organization:"
    },
    {
        field:"link",
        type:"text",
        label:"URL:"
    }
]

const APPLICATIONS = {
    endpoint:ENDPOINTS.Application
}


export const Applications = () => {
    const navigate = useNavigate();
    const api = useFetch();
    const [pageData, setPageData] = useState();
    const formRef = useRef(null);

    const initialize = async () => {
        const {data:apiApplications} = await api.apiGet(APPLICATIONS);
        // const {data:apiApplications, status:status_applications} = await api.execute({endpoint:ENDPOINTS.getApplication});
        // const {data:apiJobs, res, status:status_jobs} = await api.execute({endpoint:"/api/job/getresumejobs", ordered:[orderBy("end", false), orderBy("start", false)], criteria:[[criterion("resumeId", "=", id)]]});
        setPageData(()=>(apiApplications));
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        const apiOptions = {...APPLICATIONS};
        e.preventDefault();
        const inputs = new FormData(formRef.current);
        inputs.append("status", 0);
        apiOptions.newValues = [createFormObject(inputs)];
        
        const {data, res, status} = await api.apiInsert(apiOptions);
        // const {data, res, status} = await api.execute({endpoint:ENDPOINTS.addApplication, inputs:createFormObject(inputs)});
        if (status==200){
            formRef.current.reset();
            initialize();
            return
        };        
    }

    return (
        <div>
            <h1>
                <span>Applications</span>
            </h1>
            <form ref={formRef} className={STYLES.form}>
                {formFields.map(({field,type, label}) => (
                    <div >
                        <label htmlFor={field}>{label}</label><input className={STYLES.input} type={type} name={`${field}`}/>
                    </div>
                ))}
                <button className={STYLES.submitButton} onClick={handleSubmit}>{ICONS.add}</button>
            </form>
                    {Array.isArray(pageData)?
                        <ul>{pageData.map(item => (<Application application={item} updateData={initialize}/>))}</ul> :
                        <div>Invalid Data</div>    
                    }
        </div>)
}


const Application = ({application, updateData}) => {
    const api = useFetch();
    const navigate = useNavigate();
    const [classState,setClass] = useState(STYLES.inactive);
    const [active, setActive] = useState(false);
    const formRef = useRef();
    // const form = useForm(formRef.current);
    const [changed, setChanged] = useState(false);
    const disabled= active? null : "disabled";
    const hidden = active? "text" : "hidden";
    const {id, title, organization, link} = application;
    
    const handleEdit = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        setActive(current => !current);
        setClass(STYLES.active);
    };

    const handleDelete = async (e) => {
        const apiOptions = {...APPLICATIONS};
        e.preventDefault();
        setClass(STYLES.disabled);
        apiOptions.filterCriteria = [["id",id]];
        apiOptions.complexQuery = false;

        const {res,status} = await api.apiDelete(apiOptions);
        // const {res, status} = await api.execute({endpoint:ENDPOINTS.deleteApplication,criteria:[[criterion("id","=",id)]]})
        updateData();   
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        await handleUpdate()
    };

    const handleUpdate = async () => {
        const apiOptions = {...APPLICATIONS};
        const inputs = new FormData(formRef.current);
        apiOptions.newValues = [createFormObject(inputs)];
        apiOptions.filterCriteria = [["id",id]];
        // inputs.append(":jobId",jobId);
        // const {res,status} = await api.execute({endpoint:ENDPOINTS.updateApplication,inputs: createFormObject(inputs), criteria:[[criterion("id","=",id)]]});
        const {res,status} = await api.apiUpdate(apiOptions);
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

    const handleAdd = (e) => {
        navigate(`/application/${id}`);
    };

    const handleChange = (e) => {
        setChanged(true);
    };

    return (
        <li className={`secondary ${classState}`}>
            <form ref={formRef} id={"job"} onBlur={handleFocus}>
                <input onChange={handleChange} disabled={disabled} className={`x-90 font-200 ${classState}`} name="title" defaultValue={title}/>
                <input onChange={handleChange} disabled={disabled} className={`x-90 ${classState}`} name="organization" defaultValue={organization}/>
                <input onChange={handleChange} disabled={disabled} className={`x-90 ${classState}`} name="link" defaultValue={link} type={hidden}/>
                <div className="height-spacing flex flex-around">    
                    <a href={`${link}`} className={STYLES.formButton} target="blank">{ICONS.openLink}</a>
                    {/* <button className={STYLES.formButton} id={id} value={"navigate"} onClick={handleLink}>{ICONS.openLink}</button> */}
                    <button className={STYLES.negativeButton} id={id} value={"delete"} onClick={handleDelete}>{ICONS.delete}</button>
                    <button className={STYLES.formButton} id={id} value={"add"} onClick={handleAdd}>{ICONS.add}</button>
                    {active?
                        <button className={STYLES.formButton} id={id} value={"save"} onClick={handleSave}>{ICONS.save}</button> :    
                        <button className={STYLES.formButton} id={id} value={"edit"} onClick={handleEdit}>{ICONS.edit}</button>
                    }
                </div>
            </form>
        </li>
    )
}
