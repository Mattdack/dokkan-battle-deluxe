import React, { useState } from "react";
import Auth from "../util/auth";

import HamburgerModal from "../modals/HamburgerModal"

const AppNavbar = (
  // handles from home page
  {handleShowSingleCardStats, handleShowCharacterSelection, handleShowTeam, showCardSelection, showTeamWeb, showCardStats,
  // handles from strategy 
  handleShowStagesAndEvents, showEventsAndStages}) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50`;
  const logo = process.env.PUBLIC_URL + "/dokkanIcons/logo.png";

  const webLocationObject = window.location

  function handleToTeamBuild (e) {
    e.stopPropagation()
    window.location.assign(window.location.origin)
  }

  function handleToStrategy (e) {
    e.stopPropagation()
    window.location.assign(window.location.origin + '/strategy')
  }

  return (
    <div className="flex flex-col w-screen p-2 justify-between items-center border-b-4 border-black bg-slate-700">
      <div className="flex w-full p-2 justify-between items-center">
        <img onClick={(e) => (webLocationObject.pathname === ('/strategy') || webLocationObject.pathname === ('/help')) ? handleToTeamBuild(e) : handleToStrategy(e) }
        src={logo} alt='Dokkan Battle Helper' className="h-[3vh] sm:h-[4vh] logo-md:h-[6vh] md:h-[7.2vh] cursor-pointer" />
          {/* hamburger button */}
        <div className="flex">
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
      <div className="lg:hidden w-screen lg:w-1/3">
          {/* TODO: homepage search buttons on mobile */}
          {(showCardStats || showTeamWeb) && 
          <div className="p-2">
            <button
              className="flex font-header text-lg card-sm:text-2xl p-2 w-full border-2 border-black bg-orange-200 justify-center text-center items-center rounded-lg"
              onClick={() => handleShowCharacterSelection()}
            >
              Character Selection
            </button>
          </div>
          }

          {showCardSelection && 
          <div className="flex p-2 lg:hidden w-screen lg:w-1/3">
            <button
              className="flex font-header text-lg card-sm:text-2xl w-1/2 p-2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-l-lg"
              onClick={() => handleShowSingleCardStats()}
            >
              Details & Decks
            </button>
            <button
              className="flex font-header text-lg card-sm:text-2xl w-1/2 p-2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-r-lg"
              onClick={() => handleShowTeam()}
            >
              Build Team
            </button>
          </div>
          }

          {/* TODO: strategy search buttons on mobile */}
          {showEventsAndStages === false &&
          <div className="p-2">
            <button
              className="flex font-header text-lg card-sm:text-2xl p-2 w-full border-2 border-black bg-orange-200 justify-center text-center items-center rounded-lg"
              onClick={() => handleShowStagesAndEvents()}
            >
              Event & Stage Selection
            </button>
          </div>
          }

        </div>
    </div>
  );
};

export default AppNavbar;
