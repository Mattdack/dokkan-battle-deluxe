import React, { useState } from "react";
import ReactDom from "react-dom";


export default function Announcement( {open, onClose} ) {

  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
     <div 
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[1000]">
        <div onClick={onClose} className="w-3/4 lg:w-1/3 p-10 rounded-lg shadow-lg fixed top-[30%] right-[13%] lg:top-[25%] lg:right-[33.5%] bg-white z-[1000]">
         {/* <h1 className="text-lg font-bold">Great news, we're busy! Bad news, character load times will be slower until servers can be upgraded. We apologize for the slower load times and we hope you continue to enjoy using the app!</h1> */}
         <h1 className="text-lg font-bold">Please checkout our added <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/strategy`}>Strategy page</a>! We also have created a Help and News/Updates section to the page which can be accessed from the drop-down menu in the top right corner of the page.</h1>
        </div>
      </div>
    </>,
    document.getElementById("Announcement")
  );
}
