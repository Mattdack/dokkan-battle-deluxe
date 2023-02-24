import React, { useState, useEffect, lazy, Suspense } from "react";
import * as characterStyling from "../util/characterCardStyling";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

function AllComponentsCard({ character, webOfTeam, savedToMyCharacterDeck, userDeckData, selectedDeck, showCharactersInSelectedDeck }) {
  const selectedDeckObj = userDeckData.find(deck => deck._id === selectedDeck) || []
  const selectedDeckTeams = selectedDeckObj.teams || []
  if (webOfTeam){
    return <WebCard character={character} webOfTeam={webOfTeam} deckTeams={selectedDeckTeams} showCharactersInSelectedDeck={showCharactersInSelectedDeck} />
  } else {
    return <DeckCard character={character} savedToMyCharacterDeck={savedToMyCharacterDeck} />
  }
}

function WebCard ({character, webOfTeam, deckTeams, showCharactersInSelectedDeck}){
  
  const [isInWeb, setIsInWeb] = useState();
  // this useEffect sets the isInWeb (which is originally checking to see if a character is in the web). The map function makes a new array of all characters with just their ids. Then, if this is included, isInWeb is set to true, which will change the state of the ternary to make the background of the card change
  useEffect(() => {
    setIsInWeb(webOfTeam.map(char => char.id).includes(character.id));
  }, [webOfTeam]);
  
  const [isInSelectedDeck, setIsInSelectedDeck] = useState([])
  useEffect(() => {
    setIsInSelectedDeck(deckTeams.flatMap(team => team.characters.map(char => char.id)).includes(character.id));
  }, [deckTeams]);

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${character.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${character.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${character.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${character.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);

  return (
    <>
      <div className={`w-fit relative hover:bg-slate-900/[.4] 
      ${isInWeb ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}
      ${showCharactersInSelectedDeck && isInSelectedDeck ? 'grayscale' : ''}`}>
        <AdvancedImage
          className="h-[60px] card-sm:h-[100px] w-[60px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
          cldImg={characterThumb}
          // onError={handleImageError}
          alt={character.name}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        >
        </AdvancedImage>
        <AdvancedImage
          cldImg={characterRarity}
          className={character.rarity === "UR"
              ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
              : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
          }
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
        <AdvancedImage
          className="w-[48px] card-sm:w-[81px] absolute top-[14%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
          cldImg={characterTypeBackground}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
        <AdvancedImage
          className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
          cldImg={characterTypeBadge}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
      </div>
    </>
  );
}

function DeckCard ({character, savedToMyCharacterDeck}) {
  
  //checking to see if the character.id is included in the array of character ids  
  const [isSavedCharacter, setIsSavedCharacter] = useState(savedToMyCharacterDeck.includes(character.id))
  // this use effect allows the setIsSavedCharacter to true/false depending on whether it is in the savedDeck or not (updates when new prop or character passed in)
  useEffect(() => {
    setIsSavedCharacter(savedToMyCharacterDeck.includes(character.id));
  }, [savedToMyCharacterDeck, character.id])

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${character.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${character.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${character.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${character.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);
  
  return (
    <>
      <div className={`w-fit relative
      ${isSavedCharacter ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}
      `}>
        <AdvancedImage
          className="h-[60px] card-sm:h-[100px] w-[60px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
          // onError={handleImageError}
          cldImg={characterThumb}
          alt={character.name}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        >
        </AdvancedImage>
        <AdvancedImage
          cldImg={characterRarity}
          className={character.rarity === "UR"
              ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
              : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
          }
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
        <AdvancedImage
          className="w-[48px] card-sm:w-[81px] absolute top-[14%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
          cldImg={characterTypeBackground}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
        <AdvancedImage
          className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
          cldImg={characterTypeBadge}
          plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
        />
      </div>
    </>
  );
}

export default AllComponentsCard;
