import "./toggle.css";

// export const useToggle = () => {
  
//   const handleToggle = (e) =>{
//     console.log(e.target.value);
//   }
  export const Toggle = ({id, value, onChange}) => {
    return (<div className="toggle">
      <label className="switch">
        <input id={id} type="checkbox" checked={value} onChange={(e)=>onChange(e.target.checked)}></input>
        <span className="slider"></span>
      </label>
    </div>)
  };

    // return(Toggle, handleToggle);
// };
