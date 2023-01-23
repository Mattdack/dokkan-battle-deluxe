import React, { useState, useEffect, useRef } from "react";
import * as characterStyling from "../util/characterCardStyling";

function SuggestCard({ character, handleNewDetails, addToTeam }) {

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
      <div
        ref={ref}
        onClick={handleCardClick}
        className="w-fit relative hover:bg-slate-900/[.4]"
      >
        {isCardClicked ? (
        <div>
          <div 
          className="w-[100px] h-[50px] border-2 border-black relative"
          onClick={() => addToTeam(character)}
          >
            Add To Team
          </div>
          <div 
          className="w-[100px] h-[50px] border-2 border-black relative"
          onClick={() => handleNewDetails(character.id)}
          >
            New Sugegstions
          </div>
        </div>
        ) : (
          <>
          <img
            className="h-[100px] w-[100px] bg-no-repeat relative z-50"
            src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
              character
            )}_thumb.png`}
            alt={character.name}
          ></img>
          {character.rarity && (
            <img
              src={characterStyling.getCharacterRarityBackground(character)}
              className={
                character.rarity.trim() === "UR"
                  ? "h-[25px] absolute bottom-[8%] left-[-5%] z-50"
                  : "h-[34px] absolute bottom-[0px] left-[0px] z-50"
              }
            />
          )}
          <img
            className="w-[81px] absolute top-[13%] right-[9.75%] z-0"
            src={characterStyling.getCharacterTypeBackground(character)}
          />
          <img
            className="w-[40px] h-[40px] absolute top-[0%] right-[-2%] z-50"
            src={characterStyling.getCharacterTypeText(character)}
          />
          </>
        )
        }
      </div>
    </>
  );
}

export default SuggestCard;
