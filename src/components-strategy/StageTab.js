import React, { useEffect, memo } from "react";


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

  return (
    <div className="p-2">
      <AdvancedImage cldImg={stagePhoto} className='w-fit h-12'/>
    </div>
  );
};

export default memo(StageTab);
