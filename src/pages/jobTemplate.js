import { useNavigate, useParams } from "react-router-dom"
import { useFetch, criterion, orderBy } from "../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { createFormObject, isObjEmpty } from "../utils/utils";
import { ICONS } from "../data/iconClasses";
import { STYLES } from "../data/styleClasses";
import { ENDPOINTS } from "../data/endpoints";

// URL: /job/:id

const INPUTFORMFIELDS = [
    {
        field:"activity",
        type:"text",
        label:"Activity:",
        autocomplete:false}
]


export const JobTemplate = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const api = useFetch();
    const [pageData, setPageData] = useState({});
    const [activities, setActivities] = useState([]);
    const formRef = useRef(null);
    
    const JOB = {
        endpoint:ENDPOINTS.Jobs,
        filterCriteria:[
            ["id",id]
        ]
    }
    const ACTIVITIES = {
        endpoint:ENDPOINTS.Activities,
        // filterCriteria:[
        //     ['jobId',id]
        // ]
    }

    // const activityForm = useForm(formRef.current);
    // console.log(id,jobId);
   
    const initialize = async () => {
        
        const [
            {data:apiTemplate},
            {data:apiActivities}
        ] = await Promise.all([
            api.apiGet(JOB),
            api.apiGet(ACTIVITIES)
        ])
        
        setPageData(()=>(apiTemplate[0]));
        setActivities(()=>(apiActivities));
        console.log(apiTemplate[0]);
        console.log(apiActivities);
    }

    useEffect(()=>{
        initialize();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputs = new FormData(e.target);
        // inputs.append("jobId",id);
        const apiOptions = {
            endpoint:ENDPOINTS.Activities,
            newValues:[createFormObject(inputs)],
        }
        const {data,status} = await api.apiInsert(apiOptions);
        console.log(data);
        const linkOptions = {
            endpoint:ENDPOINTS.LinkActivityToJob,
            newValues:[
                {
                    jobId:id,
                    activityId:data[0].ID
                }
            ]
        }
        const {data:link} = await api.apiInsert(linkOptions);

        console.log(link);
        // console.log(activityForm.createFormObject(inputs));
        // const {data, res, status} = await api.execute({endpoint:ENDPOINTS.linkActivity, inputs:createFormObject(inputs)});
        // if (status==200 && parseInt(data.ID)>0){
            formRef.current.reset();
            initialize();
            // return
        // };
        // window.alert(`There was an error: ${res}`);
        
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
            
            
            <form onSubmit={handleSubmit} className={STYLES.form} ref={formRef} id={"job"}>
                {/* <label htmlFor={"title"}>Title:</label><input className={"primary"} name="title"/>
                <div className="height-padding"><label htmlFor={"description"} >Description:</label><input className={STYLES.input} name="description"/></div>
                <label htmlFor={"start"} >Start Date:</label><input type={"date"} className={"primary"} name="start"/>
                <label htmlFor={"end"} >End Data:</label><input type={"date"} className={"primary"} name="end"/> */}

                {INPUTFORMFIELDS.map(({label,type,field, autocomplete})=>(
                    <>
                    <label htmlFor={field}>{label}</label><input autocomplete={autocomplete? null:"off"} type={type} className={STYLES.input} name={field}/>
                    </>
                ))}
                <button className={STYLES.submitButton} value={"submit"}>{ICONS.add}</button>
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
    
    const api = useFetch();
    const [classState,setClass] = useState(STYLES.inactive);
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
        setClass(STYLES.active);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setClass(STYLES.disabled);
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
        // inputs.append(":jobId",jobId);
        const {res,status} = await api.execute({endpoint:ENDPOINTS.update,inputs: form.createFormObject(inputs), criteria:[[criterion("id","=",id)]]});
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
        
    }
    return (
            <li>
                {activity.activity}
            </li>
    )
}