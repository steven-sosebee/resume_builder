import { Button } from "./button";
import { Input } from "./input";
export const Form = ({ formName, formClasses, formRef, children }) => {
  const handleValidations=(callback)=>{
    callback();
  }
  return (
    <form name={formName} id={formName} ref={formRef} className={formClasses}>
        {children}
    </form>
  )




//   return (
//     <form encType="multipart/form-data" id={formName} name={formName} className={formClasses}>
//       <div className="form-main">
//       <div className={`labels`}>
//         {formInputs.map(label=>(
//           <label key={`${formName}_${label.name}_label`} className={label.class} htmlFor={label.name}>
//             {!label.label? label.name:label.label}
//           </label>
//         ))}
//       </div>
//       <div className={`inputs`}>
//         {formInputs.map((item)=>{
//           if(item.type==='select'){
//             return <select key={`${formName}_${item.name}`} name={item.name} id={item.name} className={item.class}><option>High</option><option>Medium</option><option>Low</option></select>
//         } else {
//             return <input key={`${formName}_${item.name}`} name={item.name} id={item.name} className={item.class} type={item.type} placeholder={item.placeholder? item.placeholder:null} defaultValue={item.default? item.default:null}/>  
//           }
//         })}
//       </div>
//       </div>
//       <div className={`buttons`}>
//       {formButtons.map((button) => (
//         <Button key={`${formName}_${button.button}`} buttonId={`${formName}_${button.button}`} buttonText={button.button} handleClick={button.function} styleClass={button.class} />
//       ))}
//       </div>
//     </form>
//   );
};
