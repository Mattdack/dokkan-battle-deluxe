import React, { useState, useEffect } from "react";
import * as characterStyling from "../util/characterCardStyling";

function AllComponentsCard({ character }) {
  const [isImageValid, setIsImageValid] = useState(true);

  function handleImageError() {
    setIsImageValid(false);
  }
  return (
    <>
      {isImageValid ? (
        <div className="w-fit relative hover:bg-slate-900/[.4]">
          <img
            className="h-[100px] w-[100px] bg-no-repeat relative z-50"
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
        </div>
      ) : null}
    </>
  );
}

export default AllComponentsCard;
