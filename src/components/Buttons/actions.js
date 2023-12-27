import { useState, useContext } from "react";

export const ButtonActions = ({ buttonId, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  const click =(e, action) => {
    e.preventDefault();
    if(typeof action==='function'){action()};
  }
  return (
    <button id={buttonId} data-id={buttonId} className={`btn`} ref={buttonRef} onClick={(e)=>{click(e,buttonClick)}} disabled={!buttonActive} value={buttonValue}>
      {<i className="fa-solid fa-bars"></i>}
    </button>
  );
};
