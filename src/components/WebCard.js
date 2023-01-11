import React, { useState, useEffect, useRef, memo } from "react";
import { Handle } from "reactflow";
import * as characterStyling from "../util/characterCardStyling";

function WebCard({ data: character }) {
  return (
    <>
      <Handle type="source"/>
      <Handle type="target"/>
      <img
        className="h-[100px] w-[100px] m-2 gap-4 bg-no-repeat absolute right-[8px] top-[-1px] z-10"
        src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getChracterThumbNail(
          character
        )}_thumb.png`}
        alt={character.name}
      ></img>
      <img
        src={characterStyling.getCharacterRarityBackground(character)}
        className={
          character.rarity.trim() === "UR"
            ? "h-[48px] absolute top-[136px] right-[116px] z-50"
            : "h-[56px] absolute top-[130px] right-[130px] z-50"
        }
      />
      <img
        className="w-[80px] absolute top-[20px] right-[25px] z-0"
        src={characterStyling.getCharacterTypeBackground(character)}
      />
      <img
        className="w-[40px] h-[40px] absolute top-[6px] right-[11px] z-50"
        src={characterStyling.getCharacterTypeText(character)}
      />
    </>
  );
}

export default memo(WebCard);
