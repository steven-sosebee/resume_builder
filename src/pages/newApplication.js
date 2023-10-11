import { useEffect, useRef, useState } from "react";
import { ApiCall } from "../classes/api";
import { createFormObject } from "../utils/utils";
import { Form } from "../components/form";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useFetch } from "../Hooks/useFetch";
import { dbCall } from "../utils/api";

export const NewApplication = () => {
    const applicationForm = useRef();
    const submit = useRef();
    const [list, setList] = useState([]);
    const applicationData = new ApiCall('ApplicationData');
    const formData = new ApiCall('ApplicationData');
    
    const callList = async () => {
        await applicationData.query();
        console.log(applicationData.data);
        setList(applicationData.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(applicationForm.current, submit.current);
        const formDataObj=createFormObject(formData);        
        console.log(formDataObj);
        // const res = useFetch.handleSubmit('CreateApplicationData','submit',null , formDataObj)
        const res = await dbCall(
            {
                class: 'CreateApplicationData',
                action: 'submit'
        },
            formDataObj,
            {},
            'POST'
        )
        console.log(res);
        if(res["rows inserted"]>0){
            console.log('adding to list...');
            setList([...list, {...formDataObj, id:res["ID"][0]}])
        }
    }

    const handleDelete = async (e, id, idx) => {

        e.preventDefault();
        
        console.log(id);
        console.log('deleting...')

        applicationData.delete({},{id:id})
        console.log(applicationData.data);
        setList(current => [...current].filter((x,index)=>index!==idx));
    }

    useEffect( ()=>{
        callList()        
    },[]);
    // console.log(list);
    return (
        <main>
            <header className="test">
                <h1 className="primary">New Application</h1>
                <Form formName= {'applicationForm'} formClasses={'secondary'} formRef={applicationForm}>
                    <label>Job Title</label><Input inputName={'title'} inputId={'title'} inputType={'text'} />
                    <label>Company</label><Input inputName={'company'} inputId={'company'} inputType={'text'}/>
                    <label>Link</label><Input inputName={'link'} inputId={'link'} inputType={'text'}/>
                    <br></br>
                    <Button buttonStyle={'primary btn-form'} buttonText={'Continue'} buttonId={'submit'} buttonRef={submit} buttonClick={handleSubmit}/> 
                </Form>
                
                {/* <form ref={form} onSubmit={handleSubmit} className="secondary">
                    <label>Job Title</label><input name={'title'} datatype="text"/>
                    <label>Company</label><input name={'company'} datatype="text"/>
                    <label> Link</label><input name={'link'} datatype="text"/>
                    <button ref={submit} onClick={handleSubmit} className="primary-button">Continue</button>
                </form> */}
            </header>
            <section className="tertiary">
                <ul>
                    {list.length >0 && list.map((application, idx) => (
                        <li>
                            <a href={`/application/${application.id}`}>{application.title} - {application.id}</a>
                            <Button buttonStyle={'warning'} buttonText={'X'} buttonId={application.id} buttonClick={(e)=>{handleDelete(e,application.id, idx)}}/>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}