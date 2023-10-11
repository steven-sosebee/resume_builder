import { useState, useContext } from "react";

export const Button = ({ buttonStyle, buttonText, buttonId, buttonIcon, buttonClick, buttonRef }) => {
  
  return (
    <button data-id={buttonId} className={`btn ${buttonStyle}`} ref={buttonRef} onClick={buttonClick}>
      {(buttonIcon)? (<i className={buttonIcon}></i>): (buttonText)}
    </button>
  );
};
