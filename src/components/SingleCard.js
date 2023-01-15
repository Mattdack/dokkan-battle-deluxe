import React from "react";
import * as characterStyling from "../util/characterCardStyling";

function SingleCard( { character }) {

  const characterRarityImageURL = characterStyling.getCharacterRarityBackground(character);
  return (
    
    <div className="w-[120px] h-[120px] relative">
      <img
        className="h-[100px] w-[100px] m-2 gap-4 bg-no-repeat absolute right-[7px] top-[-1px] z-10"
        src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
          character
        )}_thumb.png`}
        alt={character.name}
      ></img>
      {character.rarity && 
        <img
          src={characterStyling.getCharacterRarityBackground(character)}
          className={
            character.rarity.trim() === "UR"
              ? "h-[28px] absolute bottom-[17px] left-[-2px] z-50"
              : "h-[34px] absolute bottom-[19px] left-[2px] z-50"
          }
        />
      }
      <img
        className="w-[80px] absolute top-[20px] right-[25px] z-0"
        src={characterStyling.getCharacterTypeBackground(character)}
      />
      <img
        className="w-[40px] h-[40px] absolute top-[6px] right-[11px] z-50"
        src={characterStyling.getCharacterTypeText(character)}
      />
    </div>
  );
}

export default SingleCard;
