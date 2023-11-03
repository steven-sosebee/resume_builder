import { useState, useContext } from "react";

export const ButtonActions = ({ buttonId, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  return (
    <button data-id={buttonId} className={`btn`} ref={buttonRef} onClick={buttonClick} disabled={!buttonActive} value={buttonValue}>
      {<i class="fa-solid fa-bars"></i>}
    </button>
  );
};
