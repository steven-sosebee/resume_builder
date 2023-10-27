import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../Hooks/useFetch"
import { ApplicationList } from "./applicationList";
import { ApplicationForm } from "./applicationForm";
import { Button } from "../../components/button";
import { ApplicationView } from "./applicationView";
import { Dialog } from "../../components/dialog";
import { useDialog } from "../../Hooks/useDialog";

export const Main =()=>{
    const applicationList = useFetch('ApplicationData');
    const newApplication = useFetch('ApplicationData');
    const newResume = useFetch('ResumeData');
    const [viewDialog, setViewDialog] = useState(false);
    const [viewForm, setViewForm] = useState({title:'', company:'', link:''});
    const view = useDialog(viewForm);
    

    useEffect(()=>{
        async function initialize () {
            await applicationList.handleQuery();
            console.log(applicationList);
        }
        initialize();
        // console.log(applicationList.data);
    },[])
    
    // <ul>
        //     <h1>ToDo List</h1>
        // <li>List of Applications</li>
        
        // <li>New application Button</li>
        // <li>New Application Form (pop-up)</li>
        // <li>Mobile-first design</li>
        // <li>Add Resume Button</li>
        // <li>Add Cover Letter Button</li>
        // </ul>
    const testing =() => {
        console.log('click...')
    }

    // console.log(viewForm);
    return (
        <>
            <ApplicationForm applications={applicationList.data}/>
            <h5>Open Applications</h5>
            {applicationList.loading && applicationList.loadingMessage}
            {applicationList.data?.output?.length>0 && !applicationList.loading && <ApplicationList displayArea={setViewForm} applications={applicationList}/>}
            <view.Window>
                <h1>{viewForm.title}</h1>
                <h1>{viewForm.company}</h1>
                <h1>{viewForm.link}</h1>
            </view.Window>
            
            
            {/* <NewResume/> */}
            {/* <NewCoverLetter/> */}
            
        </>
    )
}