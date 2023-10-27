// import { useReducer, useRef } from "react";
// import { Button } from "./button";
// import { Input } from "./input";
import { useFetch } from "../Hooks/useFetch";
// import { createFormObject } from "../utils/utils";
// import { buttonActions } from "../data/buttonActions";

export const Form = ({ formName, formClasses, formRef, formDataType, children, formButtons=[] }) => {
  // const data = useFetch(formDataType);
  // const formRefs = useRef();

  // const testing = ()=> {
  //   console.log('this is done from outside the component')
  //   console.log(formRef);
  // };

  // const reducerMethod = (state, action) => {
  //   switch (action.type) {
  //       case 'add': {
  //         console.log('TODO add submit code');
  //         console.log(action.data);
  //         data.handleSubmit(action.data);
  //         break;
  //       };
        
  //       case 'delete': {
  //         console.log('TODO add delete code');
  //         break;
  //       };
  //   }
  // };

  // const [state, dispatch] = useReducer(reducerMethod);
  
  
  // const getFormData =()=> {
  //   const formData = new FormData(formRef.current);
  //   const formDataObj=createFormObject(formData);
  //   return formDataObj;
  // }
  // const handleAdd = (e) => {
    
  //   dispatch({
  //     type:'add',
  //     data: formDataObj
  //   })
  // };

  // const handleSubmit =(e, action) => {
  //   e.preventDefault();
  //   // const data = getFormData();
  //   dispatch({
  //     type:action,
  //     data:data
  //   })
  // };

  const handleValidations=(callback)=>{
    
  }

  return (
    <form name={formName} id={formName} ref={formRef} className={formClasses}>
        {children}
        {/* <Button buttonClick={testing} buttonText={'testing'}/> */}
        {/* <Button buttonClick={(e)=>handleSubmit(e,'add')} buttonText={'Add'}/> */}
    </form>
  )
};
