import React from "react";
import * as characterStyling from "../util/characterCardStyling";

function SingleCard( { character }) {

  const characterRarityImageURL = characterStyling.getCharacterRarityBackground(character);
  return (
    <div className="w-[120px] h-[120px] relative">
      <div
        className="h-[100px] w-[100px] m-2 gap-4 bg-no-repeat absolute right-[8px] top-[-1px] z-10"
        style={{
          backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getChracterThumbNail(character)}_thumb.png")`,
          backgroundSize: `100%`,
        }}
      >
      </div>
      {characterRarityImageURL && 
      <img src={characterRarityImageURL} className={
          character.rarity.trim() === "UR"
            ? "h-[48px] absolute top-[136px] right-[116px] z-50"
            : "h-[56px] absolute top-[130px] right-[130px] z-50"
        }/>
      }
      <img className="w-[80px] absolute top-[20px] right-[25px] z-0" src={characterStyling.getCharacterTypeBackground(character)}/>
      <img className="w-[40px] h-[40px] absolute top-[6px] right-[11px] z-50" src={characterStyling.getCharacterTypeText(character)}/>
    </div>
  );
}

export default SingleCard;
