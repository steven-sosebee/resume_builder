import { useState } from "react";

export const useForm = (form) => {
  
  const createFormObject =(data)=>{
    let createFormObject={};
    for(var pair of data.entries()){
        const obj = pair[0]+ ': '+ pair[1];
        createFormObject[pair[0]]=pair[1];
    };
    return createFormObject;
  }

  const dataObject =()=> {
    const formData = new FormData(form);
    const formDataObj=createFormObject(formData);
    return formDataObj;
  };

  const data = () => {
    return new FormData(form);
  }
  
  return {data, createFormObject,dataObject};
}
 //   const options = () => {
  //     const x = {value: "default", visible:"Please choose an option"};
  //     selectOptions.unshift(x);
  //       return selectOptions.map(option =>{
  //           return <option 
  //           // hidden={"hidden"}
  //           disabled={!(selectedItems.find(item=>(item.accId==option.value)))?false:true} 
  //           value={option.value}>{option.visible}</option>
  // });}

  //   return (
  //       <select 
  //       onChange={handleSelect}
  //       defaultValue={selectInitial}
  //       multiple={selectMultiple}
  //       id={selectId}
  //       name={selectName}
  //       value={formValues[selectId]? formValues[selectId]: "Please choose an option"}
  //       // size={selectSize}
  //       >
  //           {options()}
  //       </select>
  //   )
  // }  

  // return {Form, Input, Select}

// const handleChange = (e) => {
  //   e.preventDefault();
  //   if(e.target.value !== formValues[e.target.id]){
  //       // setValue(current=>e.target.value);
  //     setFormValues((current)=>({...current,[e.target.id]: e.target.value}))
  //   };
  // };

  //   const Input = ({inputName="", inputType="text", inputId=null, inputInitial=null, inputPlaceholder=null, inputClasses=null, stateClasses=null, handleValidation=null, min=0, max=null}) =>{
  //     const styles = () => {
  //       let styles = formInputStyles;
  //       if (inputClasses) {styles = inputClasses};
  //       if (stateClasses) {styles = stateClasses};
  //       return styles;
  //     }
    
  //       return (
  //         <input 
  //         name={inputName} 
  //         id={inputId} 
  //         type={inputType}
  //         className={styles()}
  //         min={min} 
  //         max={max} 
  //         placeholder={inputPlaceholder? inputPlaceholder : null} 
  //         defaultValue={formValues[inputId]? formValues[inputId] : inputInitial? inputInitial : null }
  //         // value={formValues[inputId]}
  //         onChange={handleValidation}
  //         onBlur={handleChange}
  //       />)      
  //   }

  // const Select = (props) => {
  //   const {
  //       selectOptions,
  //       selectInitial,
  //       selectMultiple,
  //       selectValues,
  //       selectSize,
  //       selectUnique,
  //       selectHook,
  //       selectId,
  //       selectedItems,
  //       selectName
  //   }=props;
    
  //   const handleSelect = (e) => {
  //     console.log(e.target.value);
  //     handleChange(e)
  //     if (selectUnique){
  //       selectHook(e.target.value, formValues[selectId])
  //     }
  //   }