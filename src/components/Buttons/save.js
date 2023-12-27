import { useState, useContext } from "react";

export const ButtonSave = ({ buttonId, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  const click =(e, action) => {
    e.preventDefault();
    action();
  }
  return (
    <button data-id={buttonId} className={`btn`} ref={buttonRef} onClick={(e)=>{click(e,buttonClick)}} disabled={!buttonActive} value={buttonValue}>
      {<i className="fa-solid fa-floppy-disk"></i>}
    </button>
  );
};
