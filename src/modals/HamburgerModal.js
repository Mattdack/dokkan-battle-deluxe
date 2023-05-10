import React, { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";

import LoginSignUpModal from "./LoginSignUpModal";
import NewsAndUpdatesModal from "./NewsAndUpdates";

import Auth from "../util/auth";

import { UserContext } from '../App';

export default function HamburgerModal({open, onClose}) {

  const { showMiddleDiv, setShowMiddleDiv, showCalculator, setShowCalculator } = useContext(UserContext);

  const [loginOpen, setLoginOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false)

  const webLocationObject = window.location

  function handleLoginOpen (e) {
    e.stopPropagation()
    setLoginOpen(true)
  }

  function handleOpenNewsAndUpdates (e) {
    e.stopPropagation()
    setUpdatesOpen(true)
  }

  function handleToHelp (e) {
    e.stopPropagation()
    window.location.assign(window.location.origin + '/help')
  }

  function handleToTeamBuild (e) {
    e.stopPropagation()
    window.location.assign(window.location.origin)
  }

  function handleToStrategy (e) {
    e.stopPropagation()
    window.location.assign(window.location.origin + '/strategy')
  }

  function handleSetShowCalculator (e) {
    e.preventDefault()
    e.stopPropagation()
    setShowCalculator(!showCalculator)
  }

  if (!open){
    return null
  }

  return ReactDom.createPortal(
    <>
      <LoginSignUpModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <NewsAndUpdatesModal open={updatesOpen} onClose={() => setUpdatesOpen(false)}/>
      <div 
      onClick={() => onClose()} 
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black/[.1] z-[999]`}>
        <div className={`flex flex-col w-[30vh] justify-center absolute top-[7vh] right-[1vh] border-4 border-black rounded-lg z-[1000]`}>
        {Auth.loggedIn() ? 
            <button
            className={`font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
            onClick={Auth.logout}
          >
            Log Out
          </button>
        :
          <button
            className={`font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
            onClick={(e) => handleLoginOpen(e)}
          >
            Login/Sign Up
          </button>
        }
          <button
            className={`font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
            onClick={(e) => handleOpenNewsAndUpdates(e)}
          >
            News & Updates
          </button>
          <a
            className={`font-header text-lg card-sm:text-2xl flex justify-center items-center text-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
            href={`${process.env.PUBLIC_URL}/help`}
          >
            Help
          </a>
          {webLocationObject.pathname === ('/') &&
          <p
          onClick={(e) => handleSetShowCalculator(e)}
          className={`font-header text-lg card-sm:text-2xl flex justify-center items-center text-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
          >
            {showCalculator ? 'Show Team Web' : 'Show Calculator'}
          </p>
          }
          {(webLocationObject.pathname === ('/') || webLocationObject.pathname === ('/help')) &&
            <a
              className={`font-header text-lg card-sm:text-2xl flex justify-center items-center text-center h-1/3 w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
              href={`${process.env.PUBLIC_URL}/strategy`}
            >
              Events and Strategy
            </a>
          }
          {(webLocationObject.pathname === ('/strategy') || webLocationObject.pathname === ('/help')) &&
            <button
              className={`font-header text-lg card-sm:text-2xl flex justify-center items-center h-fit w-full col-span-1 p-4 bg-orange-200 border-2 border-black`}
              onClick={(e) => window.location.assign(window.location.origin)}
            >
              Team & Deck Build
            </button>
          }
          {/* {(webLocationObject.pathname === ('/') && window.innerWidth > 900) &&
            <button 
            onClick={(e) => e.stopPropagation()}
            className="font-header text-lg card-sm:text-2xl flex justify-center items-center h-1/3 w-full col-span-1 p-2 bg-orange-200 border-2 border-black">
              <span>
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showMiddleDiv}
                  readOnly
                  />
                <div
                  onClick={() => {setShowMiddleDiv(!showMiddleDiv)}}
                  className="w-10 card-sm:w-16 h-4 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[37%] card-sm:after:top-[39%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                  ></div>
                <div className="font-header flex h-3/4 ml-4  items-center justify-center text-center text-base card-sm:text-xl font-light">
                Show Card Details and Decks
                </div>
              </label>
              </span>
            </button>
          } */}
        </div>
      </div>
    </>,
    document.getElementById("HamburgerPortal")
  );
}

