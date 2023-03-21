import React, { useState } from "react";
import Auth from "../util/auth";

import HamburgerModal from "../modals/HamburgerModal"

const AppNavbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50`;
  const logo = process.env.PUBLIC_URL + "/dokkanIcons/logo.png";

  return (
    <div className="h-[10vh] flex justify-between items-center bg-slate-700 border-2 border-slate-900">
      <img src={logo} alt='Dokkan Battle Helper' className="ml-2 sm:ml-4 h-[3vh] sm:h-[4vh] logo-md:h-[6vh] md:h-[7.2vh]" />
      <div className="flex pr-8">
        {/* hamburger button */}
        <button
          className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group relative"
        >
          <div
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            className={`${genericHamburgerLine} ${
              hamburgerOpen
              ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
              : "opacity-50 group-hover:opacity-100"
            }`}
            />
          <div
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            className={`${genericHamburgerLine} ${
              hamburgerOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
            }`}
            />
          <div
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            className={`${genericHamburgerLine} ${
              hamburgerOpen
              ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
              : "opacity-50 group-hover:opacity-100"
            }`}
            />
            <div
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            className="absolute w-full h-full p-2 top-0 right-0"
            />
          {hamburgerOpen ?
            <HamburgerModal open={hamburgerOpen} onClose={() => setHamburgerOpen(false)}/>
          : null}
        </button>
      </div>
    </div>
  );
};

export default AppNavbar;
