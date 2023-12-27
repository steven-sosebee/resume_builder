import { useState, useContext } from "react";

export const Button = ({ buttonStyle, buttonText, buttonId, buttonIcon, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  const handleClick = (e) => {
    e.preventDefault();
    buttonClick(e);
  }

  return (
    <button data-id={buttonId} className={`btn ${buttonStyle}`} ref={buttonRef} onClick={(e)=>handleClick(e)} disabled={!buttonActive} value={buttonValue}>
      {(buttonIcon)? (<i className={buttonIcon}></i>): (buttonText)}
    </button>
  );
};
