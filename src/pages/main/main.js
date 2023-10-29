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
    
    
    

    useEffect(()=>{
        async function initialize () {
            await applicationList.handleQuery();
            // console.log(applicationList);
        }
        initialize();
        // console.log(applicationList.data);
    },[])
    
    // <ul>
        // <li>Mobile-first design</li>
        // <li>Add Resume Button</li>
        // <li>Add Cover Letter Button</li>
        // </ul>
    const testing =() => {
        console.log('click...')
    }

    // console.log(view.Window);
    return (
        <>
            {/* <Button buttonClick={view.open} buttonText={'Open Dialog'}/> */}
            <ApplicationForm applications={applicationList.data}/>
            <h5>Open Applications</h5>
            {applicationList.loading && applicationList.loadingMessage}
            {applicationList.data?.output?.length>0 && !applicationList.loading && <ApplicationList applications={applicationList}/>}
            
            
            
            {/* <NewResume/> */}
            {/* <NewCoverLetter/> */}
            
        </>
    )
}