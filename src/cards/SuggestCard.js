import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"

import CharacterCard from './CharacterCard'

import { UserContext } from "../App";

function SuggestCard({ character, webOfTeam, selectedCharacter, handleNewDetails, addToWebOfTeam, removeFromWebOfTeam, statsSelectedOptions }) {
  const { grayCharactersInSelectedDeck, allCharacterIDsInDeck, levelOfLinks } = useContext(UserContext)

  const [isInWeb, setIsInWeb] = useState();
  // this useEffect sets the isInWeb (which is originally checking to see if a character is in the web). The map function makes a new array of all characters with just their ids. Then, if this is included, isInWeb is set to true, which will change the state of the ternary to make the background of the card change
  useEffect(() => {
    setIsInWeb(webOfTeam.map((char) => char.id).includes(character.id));
  }, [webOfTeam]);

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
    if(levelOfLinks === 1){
      matchedLinkInfo.push(linkSkillInfo.getLvl1LinkSkillInfo(matchedLinks[i]));
    } else if (levelOfLinks === 10){
      matchedLinkInfo.push(linkSkillInfo.getLvl10LinkSkillInfo(matchedLinks[i]));
    }
  }
  // uses the linkSkillInfo function which only grabs the stats that were changed
  const linkSkillStatsBoosted = linkSkillInfo.linkSkillStatBoosts(matchedLinkInfo)


  return (
      <div
        ref={ref}
        onClick={handleCardClick}
        className={`
        w-fit relative hover:bg-slate-900/[.4]
        `}
        // ${grayCharactersInSelectedDeck && isInSelectedDeck ? 'grayscale' : ''} 
      >
        <div className={`
        absolute h-[80px] card-sm:h-[85px] w-[80px] card-sm:w-[85px] bg-gray-900 z-[60] opacity-70
        ${(grayCharactersInSelectedDeck && allCharacterIDsInDeck.includes(character.id)) ? "" : "hidden"}
        `}></div>
        {isCardClicked && (
          <div className="absolute z-[59]">
            {isInWeb ? <div 
            className="flex w-[80px] card-sm:w-[85px] h-[40px] card-sm:h-[43px] border-4 border-black font-header font-light text-sm card-sm:text-md justify-center items-center text-center bg-red-500 hover:bg-red-700 rounded-t-lg abosolute"
            onClick={() =>  removeFromWebOfTeam(character)}
            >
              Remove From Team
            </div>
            :
            <div 
            className="flex w-[80px] card-sm:w-[85px] h-[40px] card-sm:h-[43px] border-4 border-black font-header font-light text-sm card-sm:text-md justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-t-lg abosolute"
            onClick={() =>  addToWebOfTeam(character)}
            >
              Add To Team
            </div>}
            <div 
            className="flex w-[80px] card-sm:w-[85px] h-[40px] card-sm:h-[43px] border-4 border-black font-header font-light text-sm card-sm:text-md justify-center items-center text-center bg-orange-400 hover:bg-amber-600 rounded-b-lg abosolute"
            onClick={() => handleNewDetails(character.id)}
            >
              Suggestion
            </div>
          </div>
        )}
          <CharacterCard individualCharacter={character} mobileSize={'80px'} desktopSize={'85px'}/>
          {selectedCharacter.id === character.id && statsSelectedOptions !== 'None' &&
          <div
            className='w-[20px] card-sm:w-[25px] h-[20px] card-sm:h-[25px] border-2 border-black rounded-full bg-green-500 absolute bottom-[5%] right-[7%] z-50'>
          </div>
          }
          {(selectedCharacter.id !== character.id && statsSelectedOptions === "ATK") &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {selectedCharacter.name !== character.name ?
            linkSkillStatsBoosted.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            :
            0
            }%
          </div>
          }
          {(selectedCharacter.id !== character.id && statsSelectedOptions === "DEF") &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {linkSkillStatsBoosted.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%
          </div>
          }
          {(selectedCharacter.id !== character.id && statsSelectedOptions === "Ki") &&
          <div
            className='flex w-[30px] card-sm:w-[40px] px-5 card-sm:px-6 justify-center items-center text-center border-2 border-black rounded-full bg-orange-200 text-sm card-sm:text-base text-black font-bold absolute bottom-[4%] right-[0%] z-50'>
            {linkSkillStatsBoosted.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
          </div>
          }
      </div>
  );
}

export default SuggestCard;
