import React, { useState } from "react";
import ReactDom from "react-dom";


export default function ErrorModal( {open, onClose, errorMessage} ) {

  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
     <div 
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.4] z-[1000]">
        <div onClick={onClose} className="w-3/4 lg:w-1/3 p-10 rounded-lg shadow-lg text-lg font-bold fixed top-[30%] right-[13%] lg:top-[25%] lg:right-[33.5%] bg-white z-[1000]">
          {errorMessage}
        </div>
      </div>
    </>,
    document.getElementById("ErrorModal")
  );
}
