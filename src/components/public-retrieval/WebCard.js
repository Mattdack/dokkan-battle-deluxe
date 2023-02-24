import React, { useState, useEffect, useRef, memo } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import * as characterStyling from "../util/characterCardStyling";

function WebCard({ id, data: { midpoint, ...character }, xPos, yPos }) {
  const newHandlePosition = getHandlePosition(midpoint, xPos, yPos);
  const [handlePosition, setHandlePosition] = useState(newHandlePosition);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setHandlePosition((prev) => {
      if (newHandlePosition !== prev) {
        updateNodeInternals(id);
      }
      return newHandlePosition;
    });
  }, [xPos, yPos, midpoint]);

  return (
    <div className="w-[100px] h-[100px] relative">
      <Handle type="source" position={handlePosition} />
      <Handle type="target" position={handlePosition} />
      <img
        className="max-w-[123.5%] left-[-11.5%] top-[-16%] gap-4 z-10 absolute"
        src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
          character
        )}_thumb.png`}
        alt={character.name}
      ></img>
      {character.rarity && (
        <img
          src={characterStyling.getCharacterRarityBackground(character)}
          className={
            character.rarity === "UR"
              ? "h-[24px] absolute bottom-[3%] left-[-13%] z-50"
              : "h-[34px] absolute bottom-[2%] left-[-11%] z-50"
          }
        />
      )}
      <img
        className="w-full z-0"
        src={characterStyling.getCharacterTypeBackground(character)}
      />
      <img
        className="w-[40px] h-[40px] absolute top-[-11%] right-[-13%] z-50"
        src={characterStyling.getCharacterTypeText(character)}
      />
    </div>
  );
}

const getHandlePosition = (midpoint, xPos, yPos) => {
  const positionToMidpoint = { x: midpoint.x - xPos, y: midpoint.y - yPos };
  if (Math.abs(positionToMidpoint.x) > Math.abs(positionToMidpoint.y)) {
    if (positionToMidpoint.x > 0) {
      return "right";
    } else {
      return "left";
    }
  } else {
    if (positionToMidpoint.y > 0) {
      return "bottom";
    } else {
      return "top";
    }
  }
};

export default memo(WebCard);
