import React, { useState, useEffect, useRef } from "react";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";
import { grayscale } from "@cloudinary/url-gen/actions/effect";

function SuggestCard({ character, webOfTeam, selectedCharacter, handleNewDetails, addToWebOfTeam, removeFromWebOfTeam, statsSelectedOptions, userDeckData, selectedDeck, showCharactersInSelectedDeck }) {
  const [isInWeb, setIsInWeb] = useState();
  // this useEffect sets the isInWeb (which is originally checking to see if a character is in the web). The map function makes a new array of all characters with just their ids. Then, if this is included, isInWeb is set to true, which will change the state of the ternary to make the background of the card change
  useEffect(() => {
    setIsInWeb(webOfTeam.map((char) => char.id).includes(character.id));
  }, [webOfTeam]);

  const [isInSelectedDeck, setIsInSelectedDeck] = useState([])

  const selectedDeckObj = userDeckData.find(deck => deck._id === selectedDeck) || []
  const selectedDeckTeams = selectedDeckObj.teams || []
  useEffect(() => {
    setIsInSelectedDeck(selectedDeckTeams.flatMap(team => team.characters.map(char => char.id)).includes(character.id));
  }, [selectedDeck]);

  //logic for card click...allows for div to close when click outside of card is made
  const [isCardClicked, setIsCardClicked] = useState(false);
  const ref = useRef(null);
  const handleCardClick = () => {
    setIsCardClicked(!isCardClicked);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsCardClicked(false);
    }
  }
  // this allows for an out of click from the suggestion card to bring it back to the regular card
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  // gets matched links between the selected character and character card
  const matchedLinks = linkSkillInfo.findMatchingLinks(selectedCharacter.link_skill, character.link_skill) || []
  let matchedLinkInfo = [];
  // gets lvl1 linkskill info of the match links
  for (let i = 0; i < matchedLinks.length; i++) {
    matchedLinkInfo.push(linkSkillInfo.getLvl1LinkSkillInfo(matchedLinks[i]));
  }
  // uses the linkSkillInfo function which only grabs the stats that were changed
  const linkSkillStatsBoosted = linkSkillInfo.linkSkillStatBoosts(matchedLinkInfo)

  // TODO: Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({secure: true, params: { "cache_control": "max-age=2592000" }})
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${character.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${character.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${character.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${character.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);


  return (
      <div
        ref={ref}
        onClick={handleCardClick}
        className={`${showCharactersInSelectedDeck && isInSelectedDeck ? 'grayscale' : ''} w-fit relative hover:bg-slate-900/[.4]`}
      >
        {isCardClicked && (
          <div className="absolute z-[900]">
            {isInWeb ? <div 
            className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-sm card-sm:text-md justify-center items-center text-center bg-red-500 hover:bg-red-700 rounded-t-lg abosolute"
            onClick={() =>  removeFromWebOfTeam(character)}
            >
              Remove From Team
            </div>
            :
            <div 
            className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-sm card-sm:text-md justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-t-lg abosolute"
            onClick={() =>  addToWebOfTeam(character)}
            >
              Add To Team
            </div>}
            <div 
            className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-xsm card-sm:text-md justify-center items-center text-center bg-orange-400 hover:bg-amber-600 rounded-b-lg abosolute"
            onClick={() => handleNewDetails(character.id)}
            >
              New Suggestion
            </div>
          </div>
        )}
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
            {/* TODO: render cloud image */}
          <AdvancedImage
            className="h-[80px] card-sm:h-[100px] card-sm:w-[100px] w-[80px] bg-no-repeat relative right-[.5%] z-50"
            cldImg={characterThumb}
            // onError={handleImageError}
            alt={character.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          >
          </AdvancedImage>
          <AdvancedImage
            cldImg={characterRarity}
            className={
              character.rarity === "UR"
                ? "h-[20px] card-sm:h-[25px] absolute bottom-[6%] left-[-5%] z-50"
                : "h-[25px] card-sm:h-[34px] absolute bottom-[5.5%] left-[0%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[65px] card-sm:w-[81px] absolute top-[13%] right-[9.5%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[30px] card-sm:w-[40px] absolute top-[0%] right-[-2%] z-50"
            cldImg={characterTypeBadge}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          {statsSelectedOptions === "ATK" &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {linkSkillStatsBoosted.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%
          </div>
          }
          {statsSelectedOptions === "DEF" &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {linkSkillStatsBoosted.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%
          </div>
          }
          {statsSelectedOptions === "Ki" &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {linkSkillStatsBoosted.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
          </div>
          }
      </div>
  );
}

export default SuggestCard;
