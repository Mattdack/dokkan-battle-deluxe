import React, { useState, useEffect, useRef, memo } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import * as characterStyling from "../util/characterCardStyling";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

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

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${character.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${character.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${character.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${character.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);

  return (
  <div className="relative w-[100px] h-[100px]">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Handle type="source" position="top"/>
      <Handle type="target" position="bottom"/>
    </div>
    <AdvancedImage
      className="max-w-[123.5%] left-[-11.5%] top-[-16%] gap-4 z-10 absolute"
      cldImg={characterThumb}
      alt={character.name}
    ></AdvancedImage>
    <AdvancedImage
      cldImg={characterRarity}
      className={
        character.rarity === "UR"
          ? "h-[24px] absolute bottom-[3%] left-[-13%] z-50"
          : "h-[34px] absolute bottom-[2%] left-[-11%] z-50"
      }
    />
    <AdvancedImage
      className="w-full z-0"
      cldImg={characterTypeBackground}
    />
    <AdvancedImage
      className="w-[40px] h-[40px] absolute top-[-11%] right-[-13%] z-50"
      cldImg={characterTypeBadge}
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
