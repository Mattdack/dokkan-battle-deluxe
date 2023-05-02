import React, { useState, useContext } from "react";
import ReactDom from "react-dom";

import { UserContext } from "../App";

export default function WebOptionsModal( {open, onClose} ) {
    const { showSummationLinks, setShowSummationLinks, levelOfLinks, setLevelOfLinks } = useContext(UserContext);


  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
     <div 
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.2] z-[1000]">
        <div onClick={(e) => e.stopPropagation()} className="w-3/4 lg:w-1/3 p-4 rounded-lg shadow-lg fixed top-[30%] right-[13%] lg:top-[25%] lg:right-[33.5%] border-black border-4 bg-white z-[1000] overflow-y-auto">
            <div className="p-2 mb-4 border-black border-2 rounded-lg">
                <p className="font-bold text-lg underline underline-offset-4 decoration-solid decoration-2">Selected Character Show</p>
                <div>
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Show Summation Links"
                        id="summationLinksRadio"
                        value="Show Summation Links"
                        checked={showSummationLinks === true}
                        onChange={() => setShowSummationLinks(true)}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="summationLinksRadio0"
                    >
                        Show Stats Summed
                    </label>
                </div>

                <div className="">
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Show Summation Name"
                        id="summationLinksRadio"
                        value="Show Summation Name"
                        checked={showSummationLinks === false}
                        onChange={() => setShowSummationLinks(false)}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="summationLinksRadio0"
                    >
                        Show Link Number
                    </label>
                </div>
            </div>
            
            <div className="p-2 mb-4 border-black border-2 rounded-lg">
                <p className="font-bold text-lg underline underline-offset-4 decoration-solid decoration-2">Show Stats for</p>
                <div className="">
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Link Level 1"
                        id="linkLevelRadio"
                        value="Link Level 1"
                        checked={levelOfLinks === 1}
                        onChange={() => setLevelOfLinks(1)}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="linkLevelRadio0"
                    >
                        Level 1 Links
                    </label>
                </div>

                <div className="">
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Link Level 10"
                        id="linkLevelRadio"
                        value="Link Level 10"
                        checked={levelOfLinks === 10}
                        onChange={() => setLevelOfLinks(10)}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="linkLevelRadio0"
                    >
                        Level 10 Links
                    </label>
                </div>
            </div>
        </div>
      </div>
    </>,
    document.getElementById("WebOptionsModal")
  );
}
