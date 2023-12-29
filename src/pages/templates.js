import { useRef, useState, useEffect } from "react";
import { useFetch, criterion } from "../Hooks/useFetch"
import { useForm } from "../Hooks/useForm";
import { ButtonActions } from "../components/Buttons/actions"
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonDelete } from "../components/Buttons/delete";
import { ICONS } from "../data/iconClasses";

// /templates
const ENDPOINTS = {
    read: "/resume/read",
    create: "/resume/create",
    delete: "/resume/delete",
    update: "/resume/update",

}

export const Templates = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const useAPI = useFetch();
    const templateForm = useForm(formRef.current);
    const [templates, setTemplates] = useState([{template:"No data",id:0}]);

    const handleSelect = async (e) => {
        navigate(`/template/${e.currentTarget.id}`)
    };

    const handleDelete = async (e) => {
        const {data:selection} = await useAPI.execute({endpoint:ENDPOINTS.delete, criteria:[[criterion("id","=",e.currentTarget.id)]]});
        getTemplates();
    }
    
    const submitForm = async (e) => {
        // e.preventDefault();
        console.log(templateForm.dataObject());
        const {res,status} = await useAPI.execute({inputs:templateForm.dataObject(), endpoint:ENDPOINTS.create});
        // console.log(data);
        if (status==200){
            formRef.current.reset();
            getTemplates();
        }
        
    }

    const getTemplates = async () => {
        const {data:initial} = await useAPI.execute({endpoint:ENDPOINTS.read});
        setTemplates(()=>initial);
    }

    useEffect(()=>{
        getTemplates();
    },[])


    return (
        <content>
            <p>Resume Templates</p>
            
            <form className={"bordered secondary"} onSubmit={(e)=>e.preventDefault()} id="template" ref={formRef}>
                <label for={":template"}>Create a new template:</label><input className={' block x-90 active'} name=":template"/>
                <button className={"right inline-margin rounded action height-padding"} onClick={submitForm}>{ICONS.add}</button>
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