import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { dbCall } from "../utils/api";
import { Keywords } from "../components/keywords";
import { CoverLetterActions } from "../components/coverLetter";
import { Form } from "../components/form";
import { Button } from "../components/button";
import { createFormObject } from "../utils/utils";
import { ApiCall } from "../classes/api";

export const ApplicationPage = () => {
    const {id} = useParams();
    const [pageData, setData] = useState();
    const [tab, setTab] = useState();
    const statusForm = useRef();
    const update = useRef();
    const tabValue = {
        resume: <p>Resume Page</p>,
        cover: <CoverLetterActions/>,
        keywords: <Keywords applicationId={id}/>
    }

    const toggleTab =(tab)=>{
        setTab(tab);
    };

    const handleData = async () => {
        const params = {
            id:id,
            class: 'getApplicationData',
            action: 'select'
        }
        let data = {
            application: await dbCall(params,{},{},"GET"),
            list: await dbCall({class:'GetApplicationData',action:'list'},{},{},'GET')
        }
        // console.log(data);
        setData(data);
    }
    const handleUpdate = async (e)=>{
        e.preventDefault();
        const formData = new FormData(statusForm.current, update.current);
        const formDataObj=createFormObject(formData);        
        console.log(formDataObj);
        // const res = useFetch.handleSubmit('CreateApplicationData','submit',null , formDataObj)
        const res = new ApiCall('ApplicationData');
        res.update({},{...formDataObj, id});
        // const res = await dbCall(
        //     {
        //         class: 'CreateApplicationData',
        //         action: 'update'
        // },
        //     formDataObj,
        //     {},
        //     'POST'
        // )
        console.log(res);
        // if(res["rows inserted"]>0){
        //     console.log('adding to list...');
        //     setList([...list, {...formDataObj, id:res["ID"][0]}])
        // }
    }

    useEffect(()=>{
        handleData()
    },[])
    if(!pageData){ return (<h1>No Data</h1>)};

    return (
        <>
        <header>
            <a href="/application">Back to Applications List</a>
            <a href="/application/new">New Application</a>
        </header>
        <aside>
            {pageData?.list?.map(application => (
                <a href={`/application/${application.id}`}>{application.title} - {application.id}</a>
            ))}
        </aside>
        <section>
            <h1>{pageData?.application[0].title}</h1>
            <h3>{pageData?.application[0].company}</h3>
            <a href={pageData?.application[0].link} target="_blank"><h3>Link to Posting</h3></a>
            <h3>{pageData?.application[0].status}</h3>
            <Form formName={'update'} formRef={statusForm}>
                <select name="status">
                    <option>Submitted</option>
                    <option>Rejected</option>
                    <option>Interview Scheduled</option>
                    <option>Position Filled</option>
                    <option>Postion Removed</option>
                    <option>Pending Feedback</option>
                </select>
                <Button buttonId={'submit'} buttonStyle={'secondary'} buttonRef={update} buttonClick={handleUpdate} buttonText={'Update'}/>
            </Form>
        </section>
        <section>
                <h4>Actions:</h4>
                <button onClick={()=>{toggleTab('resume')}}>Create Resume</button>
                <button onClick={()=>{toggleTab('cover')}}>Create Cover Letter</button>
                <button onClick={()=>{toggleTab('keywords')}}>Add Keywords</button>
        </section>
        <section>
            {tabValue[tab]}
            </section>
        </>
        
    )
}