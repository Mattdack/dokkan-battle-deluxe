import React, { useState } from "react";
import Auth from "../util/auth";

import HamburgerModal from "../modals/HamburgerModal"
import LoginSignUpModal from "../modals/LoginSignUpModal";
import HelpModal from "../modals/HelpModal";
import NewsAndUpdatesModal from "../modals/NewsAndUpdates";

const AppNavbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false)
  const [updatesOpen, setUpdatesOpen] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50`;
  const logo = process.env.PUBLIC_URL + "/dokkanIcons/logo.png";

  return (
    <div className="h-[10vh] flex justify-between items-center bg-slate-700 border-2 border-slate-900">
      <img src={logo} className="ml-2 sm:ml-4 h-[3vh] sm:h-[4vh] logo-md:h-[6vh] md:h-[7.2vh]" />
      <div className="flex pr-8">
        {/* hamburger button */}
        <button
          className="lg:hidden flex flex-col h-10 w-10 border-2 border-black rounded justify-center items-center group relative"
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
            className="absolute w-full h-full top-0 right-0"
            />
          {hamburgerOpen ?
          <HamburgerModal hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen}/>
          : null}

        </button>
        
        <button
            className="hidden lg:inline-flex ml-2 flex font-header text-2xl flex w-fit col-span-1 p-4 bg-orange-200 border-2 border-black rounded-full"
            onClick={() => setHelpOpen(true)}
        >
            Help
        </button>
        <button
            className="hidden lg:inline-flex ml-2 flex font-header text-2xl flex w-fit col-span-1 p-4 bg-orange-200 border-2 border-black rounded-full"
            onClick={() => setUpdatesOpen(true)}
        >
            News & Updates
        </button>
        {Auth.loggedIn() ? (
          <button
            className="hidden lg:inline-flex ml-2 flex font-header text-2xl flex w-fit col-span-1 p-4 bg-orange-200 border-2 border-black rounded-full"
            onClick={Auth.logout}
          >
            Log Out
          </button>
        ) : (
          <button
            className="hidden lg:inline-flex ml-2 flex font-header text-2xl flex w-fit col-span-1 p-4 bg-orange-200 border-2 border-black rounded-full"
            onClick={() => setLoginOpen(true)}
          >
            Login/Sign Up
          </button>
        )}
      </div>
      <LoginSignUpModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)}/>
      <NewsAndUpdatesModal open={updatesOpen} onClose={() => setUpdatesOpen(false)}/>
    </div>
  );
};

export default AppNavbar;
