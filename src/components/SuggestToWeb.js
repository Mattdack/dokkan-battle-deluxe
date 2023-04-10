import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_7LINKS } from "../util/queries";
import SuggestCard from "./SuggestCard";
import SuggestForm from "./SuggestForm";
import Web from "./Web";
import { add, countBy, groupBy } from "lodash";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"


import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";


function SuggestToWeb({ selectedCharacter, userCharacters, handleNewDetails, webOfTeam,  addToWebOfTeam, removeFromWebOfTeam, allCharactersLoading, showCharactersInSelectedDeck, userDeckData, selectedDeck }) {
  // these allow the selected options in the SuggestForm to be passed into the SuggestCards
  const [statsSelectedOptions, setStatsSelectedOptions] = useState("None");
  const handleStatsSelectedOptions = (event) => {
    setStatsSelectedOptions(event.target.value);
  };
  
  // this console.log brings up a lot of repatative values, is that okay?
  // console.log(userCharacters)
  const [filteredSuggestedCharacters, setFilteredSuggestedCharacters] = useState([])
  
  const {loading: isLinkedCharactersLoading, data:linkedCharactersData,} = useQuery(QUERY_7LINKS, {
    variables: {
      link1: selectedCharacter.link_skill[0],
      link2: selectedCharacter.link_skill[1],
      link3: selectedCharacter.link_skill[2],
      link4: selectedCharacter.link_skill[3],
      link5: selectedCharacter.link_skill[4],
      link6: selectedCharacter.link_skill[5],
      link7: selectedCharacter.link_skill[6],
    }
  });
  
  //TODO: finding all characters by the links of the selected character
  const linkedCharacters = linkedCharactersData?.characters7Link || [];
  // console.log(linkedCharacters)
  
  //TODO: this is making a function with filterData passed in, then setting the state for filtered characters to the filterData
  const filterAndSetSuggestedCharacters = (filterData) => setFilteredSuggestedCharacters(getFilteredCharacters(linkedCharacters, userCharacters, filterData));
  // console.log(filteredSuggestedCharacters)

  //TODO: this is then the array of arrays (characters paired by how many links match) 
  const charactersWithMatchedLinks = groupCharactersByLinkCount(filteredSuggestedCharacters, selectedCharacter.link_skill);
  // console.log(charactersWithMatchedLinks)

  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${selectedCharacter.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${selectedCharacter.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${selectedCharacter.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${selectedCharacter.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);

  return (
    <div className="">
      <Web webOfTeam={webOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} allCharactersLoading={allCharactersLoading} />

      <div className="row-span-2 px-2 pb-2">
        <div className="flex justify-around items-center">
          {/* image on mobile */}
          <div className="w-[100px] card-sm:w-[120px]">
            <div className="w-fit relative">
            <div
            className={`w-fit relative`}>
            <AdvancedImage
              className="h-[80px] card-sm:h-[95px] w-[80px] card-sm:w-[95px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[3%] card-sm:right-[0%] z-40"
              cldImg={characterThumb}
              loading='eager'
              alt={selectedCharacter.name}
              />
            <AdvancedImage
              cldImg={characterRarity}
              loading='eager'
              className={selectedCharacter.rarity === "UR"
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
          </div>

          <SuggestForm 
          onFormChange={filterAndSetSuggestedCharacters}
          statsSelectedOptions={statsSelectedOptions}
          setStatsSelectedOptions={setStatsSelectedOptions}
          handleStatsSelectedOptions={handleStatsSelectedOptions}
          allCharactersLoading={allCharactersLoading}
          />
        </div>
        
        <div className="h-[28vh] card-sm:h-[29vh] overflow-auto">
          <CharacterLinkDisplay matchCount={7} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck} />
          <CharacterLinkDisplay matchCount={6} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
          <CharacterLinkDisplay matchCount={5} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
          <CharacterLinkDisplay matchCount={4} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
          <CharacterLinkDisplay matchCount={3} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
          <CharacterLinkDisplay matchCount={2} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
          <CharacterLinkDisplay matchCount={1} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions} userDeckData={userDeckData} selectedDeck={selectedDeck} showCharactersInSelectedDeck={showCharactersInSelectedDeck}/>
        </div>
      </div>
    </div>
  );
}

// this first conditional render checks to see if there are characters with matched links, then under the specific # of links matched, it filters out characters with the same name and ID, if there are no characters, then nothing is appended to the page
const CharacterLinkDisplay = ({matchCount, webOfTeam, selectedCharacter, charactersWithMatchedLinks, handleNewDetails, addToWebOfTeam, removeFromWebOfTeam, statsSelectedOptions, userDeckData, selectedDeck, showCharactersInSelectedDeck}) => {
  return (
    <>
    {charactersWithMatchedLinks && charactersWithMatchedLinks[matchCount] && charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).length > 0 ? 
    <>
      <h3 className="h-fit font-header text-start text-md card-sm:text-xl">Characters with {matchCount} Links:</h3>
      <div className="flex flex-wrap min-h-[100px] max-h-[180px] card-sm:min-h-[120px] card-sm:max-h-[220px] justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto relative">
        {charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id && character.glb_date !== null).map((character) => (
          <div 
          id='CharacterCard'
          key={character.id}>
            <SuggestCard
              character={character}
              webOfTeam={webOfTeam}
              selectedCharacter={selectedCharacter}
              handleNewDetails={handleNewDetails}
              removeFromWebOfTeam={removeFromWebOfTeam}
              addToWebOfTeam={addToWebOfTeam}
              statsSelectedOptions={statsSelectedOptions}
              userDeckData={userDeckData}
              selectedDeck={selectedDeck}
              showCharactersInSelectedDeck={showCharactersInSelectedDeck}
            />
          </div>
        ))}
      </div>
    </>
    : null
    }
    </>
  );
}

function groupCharactersByLinkCount(otherCharacters, selectedCharacterLinks,) {
  return groupBy(otherCharacters, (character) => {
    // result is { true: includesCount, false: missingCount }
    const result = countBy(character.link_skill || [], (linkSkill) => selectedCharacterLinks.includes(linkSkill));
    return result.true;
  });
}

const getFilteredCharacters = (linkedCharacters, userCharacters, filterData) => {
  const baseChars = filterData.isUserDeckSuggest ? userCharacters : linkedCharacters;
  return baseChars.filter((character) => {
    return (
      (!filterData.searchTermSuggest || character.name.toLowerCase().includes(filterData.searchTermSuggest.toLowerCase())) &&
      (!filterData.characterCategorySuggest || character.category.includes(filterData.characterCategorySuggest)) &&
      (!filterData.characterTypeSuggest || character.type.includes(filterData.characterTypeSuggest))
    );
  });
};


export default SuggestToWeb;
