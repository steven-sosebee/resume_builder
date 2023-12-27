import { useForm } from "../Hooks/useForm";
export const Form = ({ name, id, ref, classes, formData, children}) => {
  

  return (
    <form name={name} id={id} ref={ref} className={classes}>
        {children}
    </form>
  )
};
