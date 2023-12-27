import { useRef, useState, useEffect } from "react";
import { useFetch, criterion } from "../Hooks/useFetch"
import { useForm } from "../Hooks/useForm";
import { ButtonActions } from "../components/Buttons/actions"
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonDelete } from "../components/Buttons/delete";

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
            <p>Testing new API</p>
            
            <form onSubmit={(e)=>e.preventDefault()} id="template" ref={formRef}>
                <label for={":template"}>Input new template name:</label><input className={'secondary'} name=":template"/>
            </form>
            <ButtonActions buttonClick={submitForm}/>

            <ul>
                {templates.map(template=>(
                    <li>
                        <span>{template.template}</span>
                        <button id={template.id} onClick={handleSelect}>Select</button>
                        <ButtonDelete buttonClick={handleDelete} buttonId={template.id}/>
                    </li>
                ))}
            </ul>
        </content>
    )
}