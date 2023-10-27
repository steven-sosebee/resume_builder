import { useState, useContext } from "react";

export const Button = ({ buttonStyle, buttonText, buttonId, buttonIcon, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  return (
    <button data-id={buttonId} className={`btn ${buttonStyle}`} ref={buttonRef} onClick={buttonClick} disabled={!buttonActive} value={buttonValue}>
      {(buttonIcon)? (<i className={buttonIcon}></i>): (buttonText)}
    </button>
  );
};
