import { useState, useContext } from "react";

export const ButtonDelete = ({ buttonId, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  const click =(e, action) => {
    e.preventDefault();
    action(e);
  }
  return (
    <button data-id={buttonId} id={buttonId} className={`btn negative btn-standard`} ref={buttonRef} onClick={(e)=>{click(e,buttonClick)}} disabled={!buttonActive} value={buttonValue}>
      {<i className="fa-solid fa-trash"></i>}
    </button>
  );
};
