import { useEffect, useRef, useState } from "react";
import { dbCall } from "../utils/api";
import { createFormObject } from "../utils/utils";

export const NewApplication = () => {
    const form = useRef();
    const submit = useRef();
    const [list, setList] = useState([]);
    const callList = async () => {
        const res = await dbCall(
            {
                class:'GetApplicationData',
                action:'list'
            },
            {},
            {},
            'GET'
        )
        // console.log(res);
        setList(res);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current, submit.current);
        const formDataObj=createFormObject(formData);        
        
        console.log(form.current);
        console.log(formData);
        console.log(formDataObj);

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
        // callList();
        // console.log(res);
    }

    useEffect(()=>{callList()},[]);

    return (
        <main>
            <header>
                <h1>New Application</h1>
                <form ref={form} onSubmit={handleSubmit}>
                    <label>Job Title</label><input name={'title'} datatype="text"/>
                    <label>Company</label><input name={'company'} datatype="text"/>
                    <label> Link</label><input name={'link'} datatype="text"/>
                    <button ref={submit} onClick={handleSubmit}>Continue</button>
                </form>
            </header>
            <section>
                {list?.map(application => (
                    <a href={`/application/${application.id}`}>{application.title} - {application.id}</a>
                ))}
            </section>
        </main>
    )
}