import { useEffect, useRef, useState } from "react"
import { Button } from "../components/button";

export const useDialog = () => {
    const [dialogState, setDialogState] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const dialogRef = useRef();

    const toggleDialog =() => {
        dialogState? 
        dialogRef.current?.close() :
        dialogRef.current?.showModal();

        setDialogState(current=>!current);
    }
    const open = () => {
        console.log('open');
        setDialogState(true);
    }

    const close = () => {
        setDialogState(false);
    }

    const setData = (data) => {
        setDialogData(()=>data);
    }

    const Window =({children}) => {
        return (
            <dialog ref={dialogRef} className="dialog">
                <Button buttonClick={close} buttonText={'Close'}/>
                {children}
            </dialog>
        )
    }
    useEffect(()=>{
        // console.log('effect;', dialogState)
        dialogState? 
        dialogRef.current?.showModal():
        dialogRef.current?.close();
    },[dialogState])
    return {Window, toggleDialog, open, close, setData,dialogData};

}