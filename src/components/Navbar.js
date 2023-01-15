import React, { useState } from "react";

import LoginSignUpModal from "./LoginSignUpModal";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const logo = process.env.PUBLIC_URL+"/dokkanIcons/logo.png"

  return (
<div className="h-[10vh] w-full grid grid-cols-3 justify-start items-center bg-slate-700 border-2 border-slate-900">
  <img src={logo} className='col-span-2 max-h-[10vh] object-cover'/>
  <button className='flex col-span-1 justify-end pr-4' onClick={() => setIsOpen(true)}>Login/Sign Up</button>
  <LoginSignUpModal open={isOpen} onClose={() => setIsOpen(false)}>
  </LoginSignUpModal>
</div>
  );
};

export default AppNavbar;
