import { useRef, useState, useEffect } from "react";
import { useFetch, criterion } from "../Hooks/useFetch"
import { useForm } from "../Hooks/useForm";
import { ButtonActions } from "../components/Buttons/actions"
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonDelete } from "../components/Buttons/delete";
import { ICONS } from "../data/iconClasses";

export const Templates = () => {
    const navigate = useNavigate();
    const formRef = useRef();
    const useAPI = useFetch();
    const templateForm = useForm(formRef.current);
    const [templates, setTemplates] = useState([{template:"No data",id:0}]);

    const handleSelect = async (e) => {
        // const {data:selection} = await useAPI.execute({endpoint:"/api/resume/select", criteria:[[criterion("id", "=", e.currentTarget.id)]]});
        navigate(`/template/${e.currentTarget.id}`)

    };

    const handleDelete = async (e) => {
        const {data:selection} = await useAPI.execute({endpoint:"/api/resume/delete", criteria:[[criterion("id","=",e.currentTarget.id)]]});
        console.log(selection);
        getTemplates();
    }
    const submitForm = async (e) => {
        // e.preventDefault();
        console.log(templateForm.dataObject());
        const {res,status} = await useAPI.execute({inputs:templateForm.dataObject(), endpoint:"/api/resume/new"});
        // console.log(data);
        if (status==200){
            formRef.current.reset();
            getTemplates();
        }
        
    }

    const getTemplates = async () => {
        const {data:initial} = await useAPI.execute({endpoint:"/api/resume/select"});
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
                <button className={"right inline-margin rounded action height-padding"} onClick={submitForm}><i className={ICONS.add}></i></button>
            </form>
            

            <ul>
                {templates.map(template=>(
                    <li className="height-padding highlight">
                        <span>{template.template}</span>
                        <button className={"inline-margin"} onClick={handleSelect} id={template.id}><i className={ICONS.action}></i></button>
                        <button className={"inline-margin"} onClick={handleDelete} id={template.id}><i className={ICONS.delete}></i></button>
                    </li>
                ))}
            </ul>
        </content>
    )
}