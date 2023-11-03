import { useMemo, useRef, useState } from "react"
import { useFetch } from "../../Hooks/useFetch"
import { Button } from "../../components/button"
import {buttonActions} from "../../data/buttonActions"
import { useArray } from "../../Hooks/useArray"
import { useDialog } from "../../Hooks/useDialog"
import { ButtonActions } from "../../components/Buttons/actions"

export const ApplicationList = ({applications})=>{
    const confirm = useRef();
    // const [confirmState, setConfirmState] = useState(false);
    // const [activeId, setActiveId] =useState();
    let viewForm = {title:'', company:'', link:''};
    const view = useDialog();
    const editDialog = useDialog();
    const deleteDialog = useDialog();

    const ViewApplication = (
        <view.Window>
            <h1>{view.dialogData.title}</h1>
            <h1>{view.dialogData.company}</h1>
            <h1><a target={"_blank"} href={view.dialogData.link}>Click Here</a></h1>
        </view.Window>
    );
    
    const EditApplication = (
        <editDialog.Window>
            <h1>Edit the application</h1>
        </editDialog.Window>
    )

    const DeleteApplication = (
        <deleteDialog.Window>
                <h5>Confirm delete:</h5>
                <h1>{deleteDialog.dialogData?.title}</h1>
                <div className="flex centered">
                    <Button buttonClick={async (e)=>{
                        // buttonActions.remove(e,{id:deleteDialog.dialogData?.id},applications);
                        await applications.handleDelete({id:deleteDialog.dialogData?.id});
                        const 
                        el = applications.data.output.indexOf(deleteDialog.dialogData);
                        applications.data.remove(el);
                        deleteDialog.close();
                        }} buttonIcon={"fa-solid fa-trash"} buttonStyle={"negative btn-standard"}/>
                    <Button buttonClick={(e)=>{deleteDialog.close()}} buttonIcon={"fa-solid fa-cancel"} buttonStyle={"confirm btn-standard"}/>
                </div>
        </deleteDialog.Window>
    )

    const Application = ({application,index,array}) =>{
        const {id, title, company, link} = application;
        const api = useFetch('ApplicationData');

        return ( 
            <>
            {api.loading && api.loadingMessage}
            {!api.loading && 
                <li draggable={true} className="highlight listItem" key={id} id={id}>
                    <h6>{company}</h6>
                    <span className="hide fixed">{title}</span>
                    <Button buttonActive={!api.loading} buttonClick={(e)=>{view.setData(application);view.open()}} buttonIcon={"fa-solid fa-magnifying-glass"} buttonStyle={"btn-standard"}/>
                    <Button buttonActive={!api.loading} buttonClick={buttonActions.submit} buttonIcon={"fa-solid fa-pen"} buttonStyle={"action btn-standard"}/>
                    <Button buttonActive={!api.loading} buttonClick={(e) => {deleteDialog.setData(application);deleteDialog.open()}} buttonIcon={"fa-solid fa-trash"} buttonStyle={"negative btn-standard"}/>
                    <ButtonActions/>
                        
                </li>}
            </>
        )}

    return(
        <>
            {ViewApplication}
            {DeleteApplication}
        <ul className="bordered">
            
            
            {applications.data.output?.map((x,i)=>(<Application array={applications} application={x} index={i}/>))}
        </ul>
        </>
    )

}