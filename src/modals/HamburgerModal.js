import React, { useState } from "react";
import ReactDom from "react-dom";

import LoginSignUpModal from "./LoginSignUpModal";


export default function HamburgerModal({hamburgerOpen, setHamburgerOpen}) {
  const [isOpen, setIsOpen] = useState(false);

  return ReactDom.createPortal(
    <div className={`lg:hidden flex flex-col justify-center absolute w-[30vh] h-40 top-[7vh] right-[3.8vh] border-2 border-black rounded-lg z-50`}>
      <button
        className="font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black"
        onClick={() => setIsOpen(true)}
      >
        Login/Sign Up
      </button>
      <button
        className="font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black"
        // onClick={() => setIsOpen(true)}
      >
        News & Updates
      </button>
      <button
        className="font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black"
        // onClick={() => setIsOpen(true)}
      >
        Help
      </button>
      <LoginSignUpModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>,
    document.getElementById("HamburgerPortal")
  );
}

