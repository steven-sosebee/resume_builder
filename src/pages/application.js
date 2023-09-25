import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dbCall } from "../utils/api";
import { Keywords } from "../components/keywords";
import { CoverLetterActions } from "../components/coverLetter";

export const ApplicationPage = () => {
    const {id} = useParams();
    const [pageData, setData] = useState();
    const [tab, setTab] = useState();

    const tabValue = {
        resume: <p>Resume Page</p>,
        cover: <CoverLetterActions/>,
        keywords: <Keywords/>
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
            <h3>{pageData?.application[0].link}</h3>
            <h3>{pageData?.application[0].status}</h3>
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