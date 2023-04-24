import React, { useState, useRef, useEffect, useMemo } from "react";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";
import CharacterCard from "../cards/CharacterCard";

function CardDetails({ cardDetails, hoverCharacterStats }) {
  const divRef1 = useRef(null);
  
  const characterDetails = useMemo(() => {
    if(hoverCharacterStats || hoverCharacterStats !== null){
      return hoverCharacterStats
    } else{
      return cardDetails
    }
  }, [cardDetails, hoverCharacterStats]);

  const [ezaEnabled, setEzaEnabled] = useState(false)
  
  //clears EZA button selection. Withoutit, if EZA is selected, all characters become EZA'd and descriptions become empty if characters are not EZAs
  useEffect(() => {
    setEzaEnabled(false)
  }, [cardDetails, hoverCharacterStats])

  console.log(characterDetails)

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full ">
        {/* character name, thumb, EZA button*/}
        <div className="flex flex-col w-full justify-center items-center">
          <ScrollingDiv divRef={divRef1} text={characterDetails?.title}/>
          <ScrollingDiv divRef={divRef1} text={characterDetails?.name}/>

          <div>
            <CharacterCard individualCharacter={characterDetails} mobileSize={'100px'} desktopSize={'100px'}/>
          </div>

          <button
          disabled={!characterDetails?.glb_date_eza}
          onClick={() => setEzaEnabled(!ezaEnabled)}
          className={`disabled:text-gray-900 font-header EZA-header text-2xl relative z-50`}>
            EZA
            {ezaEnabled ? 
            <img 
            className="absolute max-w-[200%] h-[120%] -bottom-[10%] -right-[50%] z-0 object-contain"
            alt='extreme awakening'
            src= {process.env.PUBLIC_URL + '/dokkanIcons/power-up.png'}
            /> : ''
            }
            
          </button>
        </div>

        {/* leader and super APPLY TO ALL CHARACTERS */}
          <div className="w-full p-2">
            <p className="w-full h-fit font-header text-center text-lg card-sm:text-2xl">
              Leader Skill:
            </p>
            <div className="w-full h-fit px-2 font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
              {!ezaEnabled ? characterDetails?.ls_description: characterDetails?.ls_description_eza}
            </div>
          </div>


          <div className="flex flex-wrap w-full p-1 justify-center">
            <p className="w-full h-fit font-header text-center text-lg card-sm:text-2xl">
              Passive Skill:
              <ScrollingDiv divRef={divRef1} text={characterDetails?.ps_name} />
            </p>
            <div className="flex w-full font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
              {!ezaEnabled ? 
                <CardDescription text={characterDetails?.ps_description} />
                : 
                <CardDescription text={characterDetails?.ps_description_eza} />
              }
            </div>
          </div>

          <div className="w-full p-2">
            <p className="w-full h-fit font-header text-center text-lg card-sm:text-2xl">
              Super Attack:
            </p>
            <ScrollingDiv divRef={divRef1} text={characterDetails?.sa_name} />
            <div className="w-full h-fit px-2 font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
              {!ezaEnabled ? 
                <CardDescription text={characterDetails?.sa_description} />
                : 
                <CardDescription text={characterDetails?.sa_description_eza} />}
            </div>
          </div>
      </div>

      {characterDetails?.ultra_sa_description && (
        <div className="flex flex-wrap w-full pt-1">
          <div className="flex flex-wrap w-full justify-center">
            <p className="w-full h-fit font-header text-center text-lg card-sm:text-2xl">
              Ultra Super Attack:
            </p>
            <ScrollingDiv divRef={divRef1} text={characterDetails?.ultra_sa_name} />
            <div className="flex font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
            {!ezaEnabled ? 
              <CardDescription text={characterDetails?.ultra_sa_description} />
              : 
              <CardDescription text={characterDetails?.ultra_sa_description_eza} />}
            </div>
          </div>
        </div>
      )}

      {characterDetails?.active_skill_name && (
        <div className="flex flex-wrap w-full pt-1">
            <p className="w-full h-fit font-header text-center text-lg card-sm:text-2xl">
              Active Skill:
            </p>
            <ScrollingDiv divRef={divRef1} text={characterDetails?.active_skill_name} />
            <div className="flex font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
              <CardDescription text={characterDetails?.active_skill} />
            </div>
            <div className="flex font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm card-sm:text-md">
              <CardDescription text={characterDetails?.active_skill_condition} />
            </div>
        </div>
      )}

      {/* links + categories */}
      <div className="flex flex-wrap w-full">
        <div className="w-full">
          <p className="h-fit flex w-full font-header text-lg card-sm:text-2xl justify-center">
            Links:
          </p>
          <div className="flex flex-wrap w-full text-sm card-sm:text-md justify-center items-center">
            {characterDetails?.link_skill &&
              characterDetails?.link_skill.map((linkText) => {
                return <CharacterLinkDisplay key={linkText} linkText={linkText} />;
              })}
          </div>
        </div>

        <div className="w-full pb-4">
          <p className="flex w-full font-header text-lg card-sm:text-2xl justify-center">
            Categories:
          </p>
          <div className="flex flex-wrap text-sm card-sm:text-md justify-center items-center">
            {characterDetails?.category &&
              characterDetails?.category.map((categoryText) => {
                return (
                  <div key={categoryText} className="w-fit font-bold bg-orange-100 border-2 border-black mt-1 mx-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] text-sm card-sm:text-md">
                    {categoryText}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

//ChatGPT helped with basically all of this. Allows for * to be clickable / off click, hovers text on click
const CardDescription = ({ text }) => {
  
  const [hover, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  
  const handleHover = (index, event) => {
    setHover(!hover);
    setHoverIndex(index);
    setHoverX(event.clientX);
    setHoverY(event.clientY);
  };

  const handleLeaveHover = (index,event) => {
    setHover(false)
    setHoverIndex(index)
  }
  
  useEffect(() => {
    const handleClickOutside = event => {
      if (hover && !event.target.closest('.hover-box')) {
        setHover(false);
        setHoverIndex(-1);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [hover]);

  if (!text) {
  return null;
  }
  
  const formattedText = text.replace(/<(.*?)>/g, '*');
  const descriptionArray = formattedText.split('*');

  const textBetweenBrackets = text.match(/<(.*?)>/g);
  let hoverTextArray = [];

  if (textBetweenBrackets) {
    hoverTextArray = textBetweenBrackets.map(t => t.slice(1, -1));
  }

  const hoverXModified = (() => {
    if (hoverX + 160 > window.innerWidth) {
      return hoverX - 160;
    } else {
      return hoverX;
    }
  })();
  
  return (
    <div>
      {descriptionArray.map((t, i) => (
        <React.Fragment key={i}>
          {t}
          {i < descriptionArray.length - 1 && (
            <b className="text-md text-orange-600 cursor-pointer relative" 
            onMouseEnter={(event) => handleHover(i + 1, event)}
            onMouseLeave={(event) => handleLeaveHover(i + 1, event)}
            onClick={(event) => handleHover(i + 1, event)}>
              *
              {hover && hoverIndex === i + 1 ? (
                <div 
                className="w-40 h-fit p-2 text-black bg-orange-400 border border-black absolute bottom-[110%] hover-box z-40">
                  {hoverTextArray[i]}
                </div>
              ) : null}
            </b>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const CharacterLinkDisplay = ({ linkText }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <div className="relative">
        {showPopUp && (
          <div className="absolute top-[-110%] p-2 bg-gray-200 text-gray-700 z-50">
            {linkSkillInfo.getLinkSkillInfo(linkText)[2]}
          </div>
        )}
        <div
          className="w-fit mx-2 font-bold bg-orange-100 border-2 border-black mt-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] text-sm card-sm:text-md"
          // onMouseEnter={() => setShowPopUp(true)}
          // onMouseLeave={() => setShowPopUp(false)}
        >
          {linkText}
        </div>
      </div>
    </>
  );
};

// ability for divs to become auto-scroll horizonally
const ScrollingDiv = ({ text }) => {
  const ScrollRate = 50;
  let DivElmnt = null;
  let ReachedMaxScroll = false;
  let PreviousScrollLeft = 0;
  let ScrollInterval = null;
  
  const divRef = useRef(null);
  const [divClass, setDivClass] = useState("flex px-4 w-full font-header text-lg card-sm:text-2xl whitespace-nowrap justify-center");
    
    useEffect(() => {
      function handleResize() {
        if (divRef.current) {
          if (divRef.current.scrollWidth <= divRef.current.clientWidth) {
            setDivClass("flex px-4 w-full font-header text-lg card-sm:text-2xl whitespace-nowrap justify-center");
            } else {
              setDivClass("flex w-[90%] px-6 overflow-x-auto font-header text-lg card-sm:text-2xl whitespace-nowrap"
          );
        }
      }
    }
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [text, divRef, window.innerWidth]);
  
  useEffect(() => {
    DivElmnt = divRef.current;
    ReachedMaxScroll = false;

    DivElmnt.scrollLeft = 0;
    PreviousScrollLeft = 0;
    
    ScrollInterval = setInterval(scrollDiv, ScrollRate);
    
    return () => {
      clearInterval(ScrollInterval);
    };
  }, [text]);
  
  function scrollDiv() {
    if (!ReachedMaxScroll) {
      DivElmnt.scrollLeft = PreviousScrollLeft;
      PreviousScrollLeft++;
      
      if (DivElmnt.scrollLeft >= DivElmnt.scrollWidth - DivElmnt.offsetWidth) {
        ReachedMaxScroll = true;
      }
    } else {
      if (DivElmnt.scrollLeft === 0) {
        ReachedMaxScroll = false;
      }
      PreviousScrollLeft--;
      DivElmnt.scrollLeft = PreviousScrollLeft;
    }
  }
  
  return (
    <div className={divClass} ref={divRef} key={text}>
      {text}
    </div>
  );
};

export default CardDetails;