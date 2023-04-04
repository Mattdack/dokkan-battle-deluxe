import React, { useEffect, memo, useState, useRef } from "react";
import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";


function StageTab({ stageName }) {
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let stagePhoto = new CloudinaryImage(`Character Categories/${stageName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').toLowerCase()}`, cloudConfig, urlConfig);
  let backgroundPhoto = new CloudinaryImage(`Character Categories/StageBackground`, cloudConfig, urlConfig);
  // const [stagePhoto, setStagePhoto] = useState(new CloudinaryImage(`Character Categories/${stageName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').toLowerCase()}`, cloudConfig, urlConfig));

  const [showStageName, setShowStageName] = useState(false)

  const handleImageError = () => {
    setShowStageName(true)
  };
  
  return (
    showStageName ? 
      <div className={`flex w-fit h-fit justify-center items-center relative z-[900]`}>
        <AdvancedImage cldImg={backgroundPhoto} className='w-fit h-fit' />
        <p text={stageName} className="w-[75%] text-white text-shadow-black card-sm:text-2xl font-bold text-center absolute truncate">{stageName}</p>
      </div>  
    :
      <div className={`z-[900]`}>
        <AdvancedImage cldImg={stagePhoto} className='w-fit h-fit ' onError={handleImageError}/>
      </div>
  );
};

export default memo(StageTab);
