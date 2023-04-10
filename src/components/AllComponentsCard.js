import React, { useState, useEffect, useRef, useMemo, memo } from "react";

import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

function AllComponentsCard({ character, webOfTeam, savedToMyCharacterDeck, userDeckData, selectedDeck, showCharactersInSelectedDeck, addToWebOfTeam, newCardDetails, removeFromWebOfTeam }) {
  const selectedDeckObj = userDeckData.find((deck) => deck._id === selectedDeck) || [];
  const selectedDeckTeams = selectedDeckObj.teams || [];
  if (webOfTeam) {
    return (
      <WebCard character={character}  webOfTeam={webOfTeam}  deckTeams={selectedDeckTeams}  showCharactersInSelectedDeck={showCharactersInSelectedDeck}  addToWebOfTeam={addToWebOfTeam}  removeFromWebOfTeam={removeFromWebOfTeam}  newCardDetails={newCardDetails}/>
    );
  } else {
    return (
      <DeckCard character={character} savedToMyCharacterDeck={savedToMyCharacterDeck}/>
    );
  }
}

const WebCard = memo(({character, webOfTeam, deckTeams, showCharactersInSelectedDeck, addToWebOfTeam, removeFromWebOfTeam, newCardDetails}) => {
  const isInWeb = useMemo(() => webOfTeam.map((char) => char.id).includes(character.id), [webOfTeam, character.id]);

  const isInSelectedDeck = useMemo(() => {
    return deckTeams.flatMap((team) => team.characters.map((char) => char.id)).includes(character.id);
  }, [deckTeams, character.id]);

  //logic for card click...allows for div to close when click outside of card is made
  const [isCardClicked, setIsCardClicked] = useState(false);
  const ref = useRef(null);

  const handleCardClick = (character) => {
    newCardDetails(character.id)
    setIsCardClicked(!isCardClicked);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsCardClicked(false);
    }
  };
  // this allows for an out of click from the suggestion card to bring it back to the regular card
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  //TODO: this is the cloudinary rendering
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({ secure: true, params: { "cache_control": "max-age=2592000" } });
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`Character Thumb/${character.id}`,cloudConfig,urlConfig);
  // let characterThumb = new CloudinaryImage(`Character Thumb/${character.id}`,cloudConfig,{...urlConfig,quality: 'auto'});
  let characterRarity = new CloudinaryImage(`rarities-types/${character.rarity}`,cloudConfig,urlConfig);
  let characterTypeBadge = new CloudinaryImage(`rarities-types/${character.type.toLowerCase()}`,cloudConfig,urlConfig);
  let characterTypeBackground = new CloudinaryImage(`rarities-types/${character.type.slice(1, 4).toLowerCase()}-background`,cloudConfig,urlConfig);

  return (
    <div
      ref={ref}
      onClick={() => handleCardClick(character)}
      className={`${showCharactersInSelectedDeck && isInSelectedDeck ? "grayscale" : ""} w-fit relative hover:bg-slate-900/[.4]`}
    >
          {isCardClicked && (
              <div>
                {isInWeb ? (
                  <div
                    className={`flex h-[60px] card-sm:h-[95px] w-[60px] card-sm:w-[95px] border-2 card-sm:border-4 border-black font-header text-sm card-sm:text-lg justify-center items-center text-center bg-red-500 hover:bg-red-700 rounded-lg absolute z-[900]`}
                    onClick={() => removeFromWebOfTeam(character)}
                  >
                    Remove From Team
                  </div>
                ) : (
                  <div
                    className={`flex h-[60px] card-sm:h-[95px] w-[60px] card-sm:w-[95px] border-2 card-sm:border-4 border-black font-header text-sm card-sm:text-lg justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-lg absolute z-[900]`}
                    onClick={() => addToWebOfTeam(character)}
                  >
                    Add To Team
                  </div>
                )}
              </div>
          )}
          <div
            className={`w-fit relative hover:bg-slate-900/[.4] 
            ${isInWeb ? "bg-slate-900/[.75] hover:bg-slate-900/[.9]" : ""}
            ${showCharactersInSelectedDeck && isInSelectedDeck ? "grayscale" : ""}`}
          >
            {/* <img
              className="h-[60px] card-sm:h-[95px] w-[60px] card-sm:w-[95px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
              src={process.env.PUBLIC_URL + '/characterArt/' + character.id + '.png'}
              loading='eager'
              alt={character.name}
              />
            <img
              className={character.rarity === "UR"
                  ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                  : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
              }
              src={process.env.PUBLIC_URL + '/dokkanIcons/rarities/' + character.rarity + '.png'}
              loading='eager'
            />
            <img
              className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
              src={process.env.PUBLIC_URL + '/dokkanIcons/types/' + character.type.slice(1, 4).toLowerCase() + '-background.png'}
              loading='eager'
              />
            <img
              className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
              src={process.env.PUBLIC_URL + '/dokkanIcons/types/' + character.type.toLowerCase() + '.png'}
              loading='eager'
            /> */}
            {/* TODO: this is the cloudinary image render */}
            <AdvancedImage
              className="h-[60px] card-sm:h-[95px] w-[60px] card-sm:w-[95px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
              cldImg={characterThumb}
              loading='eager'
              alt={character.name}
              />
            <AdvancedImage
              cldImg={characterRarity}
              loading='eager'
              className={character.rarity === "UR"
                  ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                  : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
              }
            />
            <AdvancedImage
              className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
              cldImg={characterTypeBackground}
              loading='eager'
            />
            <AdvancedImage
              className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
              cldImg={characterTypeBadge}
              loading='eager'
            />
          </div>
    </div>
  );
})

function DeckCard({ character, savedToMyCharacterDeck }) {
  //checking to see if the character.id is included in the array of character ids
  const [isSavedCharacter, setIsSavedCharacter] = useState(savedToMyCharacterDeck.includes(character.id));
  // this use effect allows the setIsSavedCharacter to true/false depending on whether it is in the savedDeck or not (updates when new prop or character passed in)
  useEffect(() => {
    setIsSavedCharacter(savedToMyCharacterDeck.includes(character.id));
  }, [savedToMyCharacterDeck, character.id]);

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({
    cloudName: process.env.REACT_APP_CLOUD_NAME,
  });

  let urlConfig = new URLConfig({ secure: true, params: { "cache_control": "max-age=2592000" } });
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`Character Thumb/${character.id}`,cloudConfig,urlConfig);
  let characterRarity = new CloudinaryImage(`rarities-types/${character.rarity}`,cloudConfig,urlConfig);
  let characterTypeBadge = new CloudinaryImage(`rarities-types/${character.type.toLowerCase()}`,cloudConfig,urlConfig);
  let characterTypeBackground = new CloudinaryImage(`rarities-types/${character.type.slice(1, 4).toLowerCase()}-background`,cloudConfig,urlConfig);

  return (
    <>
      <div
        className={`w-fit relative ${isSavedCharacter ? "bg-amber-900/[.75] hover:bg-amber-900/[.9]" : "hover:bg-slate-900/[.4]"} `}
      >
        <AdvancedImage
          className="h-[60px] card-sm:h-[95px] w-[60px] card-sm:w-[95px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
          cldImg={characterThumb}
          loading='eager'
          alt={character.name}
          />
        <AdvancedImage
          cldImg={characterRarity}
          loading='eager'
          className={character.rarity === "UR"
              ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
              : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
          }
        />
        <AdvancedImage
          className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
          cldImg={characterTypeBackground}
          loading='eager'
        />
        <AdvancedImage
          className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
          cldImg={characterTypeBadge}
          loading='eager'
        />
      </div>
    </>
  );
}

export default AllComponentsCard;
