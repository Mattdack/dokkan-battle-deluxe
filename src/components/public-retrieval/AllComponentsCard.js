import React, { useState, useEffect, lazy, Suspense } from "react";
import * as characterStyling from "../util/characterCardStyling";

import {AdvancedImage, lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

function AllComponentsCard({ character, webOfTeam, savedToDeck }) {
  if (webOfTeam){
    return <WebCard character={character} webOfTeam={webOfTeam} />
  } else {
    return <DeckCard character={character} savedToDeck={savedToDeck} />
  }
}

function WebCard ({character, webOfTeam}){
  // this valid image state is changed to false if the onError occurs on the img (basically a 404 handler)
  const [isImageValid, setIsImageValid] = useState(true);
  function handleImageError() {
    setIsImageValid(false);
  }
  
  const [isInWeb, setIsInWeb] = useState(webOfTeam.includes(character));
  // this useEffect sets the isInWeb (which is originally checking to see if a character is in the web). The map function makes a new array of all characters with just their ids. Then, if this is included, isInWeb is set to true, which will change the state of the ternary to make the background of the card change
  useEffect(() => {
    setIsInWeb(webOfTeam.map(char => char.id).includes(character.id));
  }, [webOfTeam]);

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: 'ddmgbof1l'});
  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let myImage = new CloudinaryImage(`v1676235853/Character Thumb/${character.id}`, cloudConfig, urlConfig);

  return (
    <>
      {isImageValid ? (
        <div className={`w-fit relative hover:bg-slate-900/[.4] 
        ${isInWeb ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}`}>
          <AdvancedImage
            className="h-[60px] card-sm:h-[100px] w-[60px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
            cldImg={myImage}
            // onError={handleImageError}
            alt={character.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.1})]}
          >
          </AdvancedImage>
          <img
            src={characterStyling.getCharacterRarityBackground(character)}
            className={character.rarity.trim() === "UR"
                ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
          />
          <img
            className="w-[48px] card-sm:w-[81px] absolute top-[14%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
            src={characterStyling.getCharacterTypeBackground(character)}
          />
          <img
            className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            src={characterStyling.getCharacterTypeText(character)}
          />
        </div>
      ) : null}
    </>
  );
}

function DeckCard ({character, savedToDeck}) {
  function handleImageError() {
    setIsImageValid(false);
  }
  const [isImageValid, setIsImageValid] = useState(true);
  
  //checking to see if the character.id is included in the array of character ids  
  const [isSavedCharacter, setIsSavedCharacter] = useState(savedToDeck.includes(character.id))
  // this use effect allows the setIsSavedCharacter to true/false depending on whether it is in the savedDeck or not (updates when new prop or character passed in)
  useEffect(() => {
    setIsSavedCharacter(savedToDeck.includes(character.id));
  }, [savedToDeck, character.id])
  
  return (
    <>
      {isImageValid ? (
        <div className={`w-fit relative
        ${isSavedCharacter ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
          <img
            className="h-[60px] card-sm:h-[100px] w-[60px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
            src={process.env.PUBLIC_URL + `/characterArt/${character.id}.png`}
            // onError={handleImageError}
            alt={character.name}
          >
          </img>
          <img
            src={characterStyling.getCharacterRarityBackground(character)}
            className={character.rarity.trim() === "UR"
                ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
          />
          <img
            className="w-[48px] card-sm:w-[81px] absolute top-[14%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
            src={characterStyling.getCharacterTypeBackground(character)}
          />
          <img
            className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            src={characterStyling.getCharacterTypeText(character)}
          />
        </div>
      ) : null}
    </>
  );
}

export default AllComponentsCard;
