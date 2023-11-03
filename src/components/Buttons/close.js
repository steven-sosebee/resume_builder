import { useState, useContext } from "react";

export const ButtonClose = ({ buttonId, buttonClick, buttonRef, buttonActive=true ,buttonValue=''}) => {
  
  return (
    <button data-id={buttonId} className={`btn btn-dialog`} ref={buttonRef} onClick={buttonClick} disabled={!buttonActive} value={buttonValue}>
      {<i class="fa-solid fa-sm fa-circle-xmark btn-close"></i>}
    </button>
  );
};
