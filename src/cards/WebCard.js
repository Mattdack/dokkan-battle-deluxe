import React, { useState, useEffect, useRef, memo } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import * as characterStyling from "../util/characterCardStyling";

import CharacterCard from "./CharacterCard";

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
  <div style={{zIndex: 5000}} className="relative w-[125px] h-[125px]">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Handle type="source" position="top"/>
      <Handle type="target" position="bottom"/>
    </div>
    <CharacterCard individualCharacter={character} mobileSize={'125px'} desktopSize={'125px'}/>
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
