import { useRef, useState, useEffect } from "react";
import { useFetch, criterion } from "../Hooks/useFetch"
import { useForm } from "../Hooks/useForm";
import { ButtonActions } from "../components/Buttons/actions"
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonDelete } from "../components/Buttons/delete";
import { ICONS } from "../data/iconClasses";
import { ENDPOINTS } from "../data/endpoints";
import { createFormObject } from "../utils/utils";

// /templates
// const ENDPOINTS = {
//     readResume: "/resume/read",
//     createResume: "/resume/create",
//     deleteResume: "/resume/delete",
//     updateResume: "/resume/update",

// }

const RESUMES = {
    endpoint:ENDPOINTS.Resume
}

export const Templates = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const api = useFetch();
    const templateForm = useForm(formRef.current);
    const [templates, setTemplates] = useState([{template:"No data",id:0}]);

    const handleSelect = async (e) => {
        navigate(`/template/${e.currentTarget.id}`)
    };

    const handleDelete = async (e) => {
        // const {data:selection} = await useAPI.execute({endpoint:ENDPOINTS.deleteResume, criteria:[[criterion("id","=",e.currentTarget.id)]]});
        getTemplates();
    }
    
    const submitForm = async (e) => {
        e.preventDefault();
        // console.log(templateForm.dataObject());
        const inputs = new FormData(e.target);
        const apiOptions = {...RESUMES};
        apiOptions.newValues = [createFormObject(inputs)];
        const {data,status} = await api.apiInsert(apiOptions);
        // const {res,status} = await useAPI.execute({inputs:templateForm.dataObject(), endpoint:ENDPOINTS.createResume});
        // console.log(data);
        if (status==200){
            e.target.reset();
            getTemplates();
        }
        
    }

    const getTemplates = async () => {
        const {data:initial} = await api.apiGet(RESUMES);
        // const {data:initial} = await useAPI.execute({endpoint:ENDPOINTS.getResume});
        setTemplates(()=>initial);
    }

    useEffect(()=>{
        getTemplates();
    },[])


    return (
        <content>
            <p>Resume Templates</p>
            
            <form className={"bordered secondary"} onSubmit={submitForm} id="template" ref={formRef}>
                <label for={":template"}>Create a new template:</label><input className={' block x-90 active'} name="template"/>
                <button value={"submit"}className={"right inline-margin rounded action height-padding"}>{ICONS.add}</button>
            </form>
            

            <ul>
                {templates.map(template=>(
                    <li className="height-padding highlight">
                        <span>{template.template}</span>
                        <button className={"inline-margin"} onClick={handleSelect} id={template.id}>{ICONS.action}</button>
                        <button className={"inline-margin"} onClick={handleDelete} id={template.id}>{ICONS.delete}</button>
                    </li>
                ))}
            </ul>
        </content>
    )
}