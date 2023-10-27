import { useMemo, useRef, useState } from "react"
import { useFetch } from "../../Hooks/useFetch"
import { Button } from "../../components/button"
import {buttonActions} from "../../data/buttonActions"
import { useArray } from "../../Hooks/useArray"

export const ApplicationList = ({applications, displayArea})=>{
    // let applications = useArray(data.data);
    const confirm = useRef();
    const [confirmState, setConfirmState] = useState(false);
    const [activeId, setActiveId] =useState();

    const Application = ({application,index,array}) =>{
        const {id, title, company, link} = application;
        const api = useFetch('ApplicationData');


        const handleDialogClose =()=> {
            console.log(confirm.current.returnValue);
        }

        return ( 
            <>
            {api.loading && api.loadingMessage}
            {!api.loading && 
                <li draggable={true} className="highlight listItem" key={id} id={id}>
                    <span className="hide fixed">{title}</span>
                    <Button buttonActive={!api.loading} buttonClick={(e)=>{displayArea(()=>(application))}} buttonIcon={"fa-solid fa-magnifying-glass"} buttonStyle={"btn-standard"}/>
                    <Button buttonActive={!api.loading} buttonClick={buttonActions.submit} buttonIcon={"fa-solid fa-pen"} buttonStyle={"action btn-standard"}/>
                    <Button buttonActive={!api.loading} buttonClick={(e) => {
                        setActiveId(application);
                        buttonActions.toggleDialog(e,confirmState,confirm,setConfirmState);
                    }
                        } buttonIcon={"fa-solid fa-trash"} buttonStyle={"negative btn-standard"}/>
                </li>}
            </>
        )}
    
    return(
        <ul className="bordered">
            <dialog className={'dialog'} ref={confirm}>
                <h5>Confirm delete:</h5>
                <h1>{activeId?.title}</h1>
                <div className="flex centered">
                    <Button buttonClick={(e)=>{
                        buttonActions.remove(e,{id:activeId.id},applications);
                        const el = applications.data.output.indexOf(activeId);
                        applications.data.remove(el);
                        buttonActions.toggleDialog(e,confirmState,confirm,setConfirmState);
                        }} buttonIcon={"fa-solid fa-trash"} buttonStyle={"negative btn-standard"}/>
                    <Button buttonClick={(e)=>{buttonActions.toggleDialog(e,confirmState,confirm,setConfirmState)}} buttonIcon={"fa-solid fa-cancel"} buttonStyle={"confirm btn-standard"}/>
                </div>
            </dialog>
            {applications.data.output?.map((x,i)=>(<Application array={applications} application={x} index={i}/>))}
        </ul>
    )

}