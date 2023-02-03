import React, { useState, useEffect, useRef } from "react";
import * as characterStyling from "../util/characterCardStyling";

function SuggestCard({ character, handleNewDetails, addToWebOfTeam }) {
  const [isImageValid, setIsImageValid] = useState(true);
  function handleImageError() {
    setIsImageValid(false);
  }
  //logic for card click...allows for div to close when click outside of card is made
  const [isCardClicked, setIsCardClicked] = useState(false);
  const ref = useRef(null);
  const handleCardClick = () => {
    setIsCardClicked(!isCardClicked);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsCardClicked(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
    {isImageValid ? 
      <div
        ref={ref}
        onClick={handleCardClick}
        className="w-fit relative hover:bg-slate-900/[.4]"
      >
        {isCardClicked ? (
        <div>
          <div 
          className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-sm card-sm:text-md justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-t-lg"
          onClick={() =>  addToWebOfTeam(character)}
          >
          Add To Team
          </div>
          <div 
          className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-xsm card-sm:text-md justify-center items-center text-center bg-orange-400 hover:bg-amber-600 rounded-b-lg"
          onClick={() => handleNewDetails(character.id)}
          >
            New Suggestion
          </div>
        </div>
        ) : (
          <>
          <img
            className="h-[80px] card-sm:h-[100px] card-sm:w-[100px] w-[80px] bg-no-repeat relative z-50"
            src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
              character
            )}_thumb.png`}
            onError={handleImageError}
            alt={character.name}
          ></img>
          {character.rarity && (
            <img
              src={characterStyling.getCharacterRarityBackground(character)}
              className={
                character.rarity.trim() === "UR"
                  ? "h-[20px] card-sm:h-[25px] absolute bottom-[6%] left-[-5%] z-50"
                  : "h-[25px] card-sm:h-[34px] absolute bottom-[5.5%] left-[0%] z-50"
              }
            />
          )}
          <img
            className="w-[65px] card-sm:w-[81px] absolute top-[13%] right-[9.5%] z-0"
            src={characterStyling.getCharacterTypeBackground(character)}
          />
          <img
            className="w-[30px] card-sm:w-[40px] absolute top-[0%] right-[-2%] z-50"
            src={characterStyling.getCharacterTypeText(character)}
          />
          </>
        )
        }
      </div>   
    : 
    null}
    </>
  );
}

export default SuggestCard;
