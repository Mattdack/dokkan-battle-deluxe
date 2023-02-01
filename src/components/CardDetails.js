import React, { useState, useRef, useEffect } from "react";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo";
import { set } from "lodash";

function CardDetails({ cardDetails }) {
  const divRef1 = useRef(null);
  const [ezaEnabled, setEzaEnabled] = useState(false)

  //clears EZA button selection. Withoutit, if EZA is selected, all characters become EZA'd and descriptions become empty if characters are not EZAs
  useEffect(() => {
    setEzaEnabled(false);
  }, [cardDetails])

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-[40%] flex flex-wrap">
        {/* character name, thumb, EZA button*/}
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <div className="flex h-[50%] w-full py-1 font-header overflow-y-auto text-xl card-sm:text-2xl justify-center text-center">
              {cardDetails.name}
          </div>

          <div className="w-fit relative">
            <div
              onClick={() => {}}
              className="h-[161px] w-[161px] bg-no-repeat relative z-50"
              style={{
                backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
                  cardDetails
                )}_thumb.png")`,
                backgroundSize: `100%`,
              }}
            ></div>
            <img
              className={
                cardDetails && cardDetails.rarity.trim() === "UR"
                  ? "h-[35px] absolute top-[115px] right-[98px] z-50"
                  : "h-[56px] absolute top-[92px] right-[92px] z-50"
              }
              src={characterStyling.getCharacterRarityBackground(cardDetails)}
              alt=""
            />
            <img
              className="w-[131px] absolute top-[20px] right-[15px] z-0"
              src={characterStyling.getCharacterTypeBackground(cardDetails)}
              alt=""
            />
            <img
              className="w-[65px] absolute top-[-1px] right-[-8px] z-50"
              src={characterStyling.getCharacterTypeText(cardDetails)}
              alt=""
            />
          </div>

          <button
          disabled={!cardDetails.glb_date_eza}
          onClick={() => setEzaEnabled(!ezaEnabled)}
          className={`disabled:text-gray-900 font-header EZA-header text-2xl relative z-50`}>
            EZA
            {ezaEnabled ? 
            <img 
            className="absolute max-w-[200%] h-[120%] -bottom-[10%] -right-[40%] z-0 object-contain"
            src= {process.env.PUBLIC_URL + '/dokkanIcons/power-up.png'}
            /> : ''}
          </button>
        </div>

        {/* leader and super APPLY TO ALL CHARACTERS */}
        <div className="h-full w-1/2 pt-2 pr-2">
          <div className="h-[50%]">
            <p className="h-fit font-header text-center text-lg card-sm:text-2xl overflow-y-auto">
              Leader Skill:
            </p>
            <div className="w-full h-[72.5%] lg:h-[75%] overflow-y-auto font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-2xsm">
              {!ezaEnabled ? cardDetails.ls_description : cardDetails.ls_description_eza}
            </div>
          </div>

          <div className="flex flex-wrap justify-center h-[50%] w-full">
            <ScrollingDiv divRef={divRef1} text={cardDetails.sa_name} />
            <div className="w-full h-[72.5%] lg:h-[75%] overflow-y-auto font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.sa_description : cardDetails.sa_description_eza}
            </div>
          </div>
        </div>
      </div>

      {/* ONLY ultra */}
      {!cardDetails.active_skill_name && cardDetails.ultra_sa_description && (
        <div className="h-[30%] flex">
          <div className="flex flex-wrap justify-center h-full w-1/2">
            <ScrollingDiv divRef={divRef1} text={cardDetails.ps_name} />
            <div className="flex h-[79%] overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.ps_description : cardDetails.ps_description_eza}
            </div>
          </div>
          <div className="flex flex-wrap justify-center h-full w-1/2">
            <ScrollingDiv divRef={divRef1} text={cardDetails.ultra_sa_name} />
            <div className="flex h-[79%] overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.ultra_sa_description : cardDetails.ultra_sa_description_eza}
            </div>
          </div>
        </div>
      )}

      {/* ONLY active */}
      {cardDetails.active_skill_name && !cardDetails.ultra_sa_description && (
        <div className="h-[30%] flex">
          <div className="flex flex-wrap justify-center h-full w-1/2">
            <ScrollingDiv divRef={divRef1} text={cardDetails.ps_name} />
            <div className="flex h-[79%] overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.ps_description : cardDetails.ps_description_eza}
            </div>
          </div>
          <div className="flex flex-wrap justify-center h-full w-1/2">
            <ScrollingDiv divRef={divRef1} text={cardDetails.active_skill_name} />
            <div className="flex h-[79%] overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
                {cardDetails.active_skill_condition}
            </div>
          </div>
        </div>
      )}

      {/* ultra AND active */}
      {cardDetails.active_skill_name && cardDetails.ultra_sa_description && (
        <div className="h-[30%] flex">
          <div className="flex flex-wrap justify-center h-full w-1/2">
            <ScrollingDiv divRef={divRef1} text={cardDetails.ps_name}/>
            <div className="flex h-[79%] overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.ps_description : cardDetails.ps_description_eza}
            </div>
          </div>

          <div className="flex flex-wrap justify-center h-full w-[48%]">
            <ScrollingDiv divRef={divRef1} text={cardDetails.ultra_sa_name} />
            <div className="flex h-[32%] mt-2 overflow-y-auto font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {!ezaEnabled ? cardDetails.ultra_sa_description : cardDetails.ultra_sa_description_eza}
            </div>
            <ScrollingDiv divRef={divRef1} text={cardDetails.active_skill_name} />
            <div className="flex h-[31.5%] mb-1 overflow-y-auto font-bold bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
              {cardDetails.active_skill_condition}
            </div>
          </div>
        </div>
      )}

      {/* no ultra or active */}
      {!cardDetails.active_skill_name && !cardDetails.ultra_sa_description && (
      <div className="flex flex-wrap justify-center h-[30%]">
        <ScrollingDiv divRef={divRef1} text={cardDetails.ps_name} />
        <div className="flex h-[79%] w-full overflow-y-auto font-bold bg-orange-100 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
          {!ezaEnabled ? cardDetails.ps_description : cardDetails.ps_description_eza}
        </div>
      </div>
      )}

      {/* links + categories */}
      <div className="h-[28%] w-full flex flex-row">
        <div className="h-full w-1/2">
          <p className="h-fit flex w-full font-header text-lg card-sm:text-2xl justify-center">
            Links:
          </p>
          <div className="h-[70%] lg:h-[90%] pr-2 pl-2 overflow-auto text-sm">
            {cardDetails.link_skill &&
              cardDetails.link_skill.map((linkText) => {
                return <CharacterLinkDisplay linkText={linkText} />;
              })}
          </div>
        </div>

        <div className="h-full w-1/2 pr-2">
          <p className="h-fit flex w-full font-header text-lg card-sm:text-2xl justify-center">
            Categories:
          </p>
          <div className="h-[70%] lg:h-[90%] pr-2 pl-2 overflow-auto text-sm">
            {cardDetails.category &&
              cardDetails.category.map((categoryText) => {
                return (
                  <div className="h-min-10 w-full flex flex-wrap font-bold bg-orange-100 border-2 border-black mt-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] text-sm">
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

const CharacterLinkDisplay = ({ linkText }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <div className="relative">
        {showPopUp && (
          <div className="absolute top-[-100%] p-2 bg-gray-200 text-gray-700 z-50">
            {linkSkillInfo.getLinkSkillInfo(linkText)[2]}
          </div>
        )}
        <button
          className="h-min-10 w-full flex flex-wrap font-bold bg-orange-100 border-2 border-black mt-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] text-sm"
          // onMouseEnter={() => setShowPopUp(true)}
          // onMouseLeave={() => setShowPopUp(false)}
        >
          {linkText}
        </button>
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
  const [divClass, setDivClass] = useState(
    "flex px-4 w-full font-header text-lg card-sm:text-2xl whitespace-nowrap justify-center"
    );
    
    useEffect(() => {
      function handleResize() {
        if (divRef.current) {
          if (divRef.current.scrollWidth <= divRef.current.clientWidth) {
            setDivClass(
              "flex px-4 w-full font-header text-lg card-sm:text-2xl whitespace-nowrap justify-center"
              );
            } else {
              setDivClass(
              "flex w-[94%] px-6 w-full overflow-x-auto font-header text-lg card-sm:text-2xl whitespace-nowrap"
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
    <div className={divClass} ref={divRef}>
      {text}
    </div>
  );
};

export default CardDetails;