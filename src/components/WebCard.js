import React, { useState, useEffect, useRef, memo } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import * as characterStyling from "../util/characterCardStyling";

function WebCard({id, data:{midpoint, ...character}, xPos, yPos }) {
  const newHandlePosition = getHandlePosition(midpoint, xPos, yPos)
  const [handlePosition, setHandlePosition] = useState(newHandlePosition)
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setHandlePosition(prev => {
      if(newHandlePosition !== prev) {
        updateNodeInternals(id);
      }
      return newHandlePosition
    })
  }, [xPos, yPos, midpoint])

  return (
    <>
      <Handle type="source" position={handlePosition}/>
      <Handle type="target" position={handlePosition}/>
      <img
        className="h-[100px] w-[100px] m-2 gap-4 bg-no-repeat absolute right-[8px] top-[-1px] z-10"
        src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
          character
        )}_thumb.png`}
        alt={character.name}
      ></img>
      <img
        src={characterStyling.getCharacterRarityBackground(character)}
        className={
          character.rarity.trim() === "UR"
            ? "h-[48px] absolute top-[56px] right-[56px] z-50"
            : "h-[56px] absolute top-[56px] right-[56px] z-50"
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

const getHandlePosition = (midpoint, xPos, yPos) => {
  const positionToMidpoint = {x: midpoint.x - xPos, y: midpoint.y - yPos}
  if(Math.abs(positionToMidpoint.x) > Math.abs(positionToMidpoint.y)) {
    if(positionToMidpoint.x > 0) {
      return "right";
    } else {
      return "left";
    }
  } else {
    if(positionToMidpoint.y > 0) {
      return "bottom"
    } else {
      return "top"
    }
  }
}

export default memo(WebCard);
