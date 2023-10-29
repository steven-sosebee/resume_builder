import { useState,useRef } from "react"
import { Button } from "../../components/button"
import { buttonActions } from "../../data/buttonActions"
import { Form } from "../../components/form";
import { Input } from "../../components/input";
import { useFetch } from "../../Hooks/useFetch";
import { createFormObject } from "../../utils/utils";

export const ApplicationForm =({applications})=>{
    const [dialogState, setDialogState] = useState(false);
    const formSubmission = useFetch('ApplicationData');
    const resumeDialog =  useRef();
    const dialogForm = useRef();

    const getFormData =(formRef)=> {
        const formData = new FormData(formRef.current);
        const formDataObj=createFormObject(formData);
        return formDataObj;
    }

    const handleSubmit = async (e,dialogForm,formSubmission)=>{
        // console.log(formSubmission.loading); 
        let newApplication = getFormData(dialogForm);

        await buttonActions.formSubmit(e, dialogForm, formSubmission);
        console.log(formSubmission.data.output);
        
        newApplication= {...newApplication, id: formSubmission.data.output.ID}
        console.log(newApplication);
        // console.log(applications);
        applications.push(newApplication);
        resumeDialog.current.close();
    }


    return(
        <section>
            <Button buttonStyle={'btn-sticky bottom left action btn-standard'} buttonIcon={"fa-solid fa-plus"} buttonClick={(e)=>{buttonActions.toggleDialog(e,dialogState, resumeDialog, setDialogState)}}/>
            <dialog onClose={(e)=>{buttonActions.toggleDialog(e,dialogState, resumeDialog, setDialogState)}} ref={resumeDialog} >
                <h1>This is a dialog</h1>
                <Button buttonIcon={"fa-solid fa-minus"} buttonClick={(e)=>{resumeDialog.current.close()}}/>
                <Form formRef={dialogForm} formName= {'applicationForm'} formClasses={'secondary'} formDataType={'ApplicationData'}>
                    <label>Job Title</label><Input inputClasses="block" inputName={'title'} inputId={'title'} inputType={'text'} />
                    <label>Company</label><Input inputClasses="block" inputName={'company'} inputId={'company'} inputType={'text'}/>
                    <label>Link</label><Input inputClasses="block" inputName={'link'} inputId={'link'} inputType={'text'}/>
                    <Button buttonActive={!formSubmission.loading} buttonStyle={'primary btn-form'} buttonText={'Submit'} buttonId={'submit'} buttonClick={
                        (e)=>{
                            // console.log(formSubmission.loading); buttonActions.formSubmit(e, dialogForm, data)
                            handleSubmit(e,dialogForm,formSubmission)
                        }
                        }/> 
                    {formSubmission.status}
                </Form>    
            </dialog>
        </section>
        
    )
}