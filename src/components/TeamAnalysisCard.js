import React, { useState, useEffect, useRef, memo } from "react";
import { Handle, Position } from "reactflow";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

function TeamAnalysisCard({ id, data }) {
  let characterBorderColor = ''
  if(data?.character?.type.slice(1,4).toLowerCase() === 'phy'){
    characterBorderColor = '#946e2c'
  } else if (data?.character?.type.slice(1,4).toLowerCase() === 'str'){
    characterBorderColor = '#921100'
  } else if (data?.character?.type.slice(1,4).toLowerCase() === 'int'){
    characterBorderColor = '#7c0189'
  } else if (data?.character?.type.slice(1,4).toLowerCase() === 'teq'){
    characterBorderColor = '#016721'
  } else if (data?.character?.type.slice(1,4).toLowerCase() === 'agl'){
    characterBorderColor = '#200cb9'
  }
  if(data.character === null || typeof data.character === undefined){
    return null
  }
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${data?.character?.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${data?.character?.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${data?.character?.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${data?.character?.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);
  

  
  return (
    <div className="w-[125px] h-[125px] relative">
      {data.handlePositionRight && data.handlePositionBottom ? 
        <>
        <Handle type="source" position={data.handlePositionRight} style={{ position:'absolute', right:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/> 
        <Handle type="target" position={data.handlePositionBottom} style={{ position:'absolute', bottom:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
        </>
      : ''}
      {data.handlePositionLeft && data.handlePositionBottom ? 
        <>
          <Handle type="source" position={data.handlePositionLeft} style={{ position:'absolute', left:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
          <Handle type="target" position={data.handlePositionBottom} style={{ position:'absolute', bottom:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
        </>
      : ''}
      {data.handlePositionTop && data.handlePositionRight ? 
        <>
          <Handle type="source" position={data.handlePositionTop} style={{ position:'absolute', top:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
          <Handle type="target" position={data.handlePositionRight} style={{ position:'absolute', right:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
        </>
      : ''}
      {data.handlePositionTop && data.handlePositionLeft ? 
        <>
          <Handle type="source" position={data.handlePositionTop} style={{ position:'absolute', top:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
          <Handle type="target" position={data.handlePositionLeft} style={{ position:'absolute', left:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
        </>
      : ''}
      {data.handlePositionTop && data.handlePositionBottom ? 
        <>
          <Handle type="source" position={data.handlePositionTop} style={{ position:'absolute', top:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
          <Handle type="target" position={data.handlePositionBottom} style={{ position:'absolute', bottom:3, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: characterBorderColor, borderColor: characterBorderColor}}/>
        </>
      : ''}
      <AdvancedImage
        className="max-w-[123.5%] left-[-11.5%] top-[-16%] gap-4 z-10 absolute"
        cldImg={characterThumb}
        // alt={character.name}
      ></AdvancedImage>
      <AdvancedImage
        cldImg={characterRarity}
        className={"h-[24px] absolute bottom-[3%] left-[-13%] z-50"}
          // character.rarity === "UR"
          //   ? "h-[24px] absolute bottom-[3%] left-[-13%] z-50"
          //   : "h-[34px] absolute bottom-[2%] left-[-11%] z-50"
        // }
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
};

export default memo(TeamAnalysisCard);
