import { useFetch } from "../Hooks/useFetch";
import { createFormObject } from "../utils/utils";

const getFormData =(formRef)=> {
    const formData = new FormData(formRef.current);
    const formDataObj=createFormObject(formData);
    return formDataObj;
}

export const buttonActions = {
    formSubmit: async (e, form, api) => {
        e.preventDefault();
        try{
            await api.handleSubmit(getFormData(form));
            form.current.reset();
        } catch (error){
            console.log(error);
        }
        
    },
    remove: async (e,body,api)=> {
        e.preventDefault();
        try{
            await api.handleDelete(body);
        } catch (error) {
            console.log(error);
        }
    },

    view: (e, id, api)=> {
        e.preventDefault();

        console.log(api.find(element=>element.id=id))        
    },

    toggleDialog: (e, state, dialog, setState)=> {
        e.preventDefault();
        console.log('toggleDialog')
        state? dialog.current.close() : dialog.current.showModal();
        setState(!state);
    }
}
