import React, { useState, useEffect } from "react";

import Web from "./Web";
import SuggestForm from "./SuggestForm";
import SuggestCard from "../cards/SuggestCard";
import CharacterCard from "../cards/CharacterCard";

import { add, countBy, groupBy } from "lodash";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"



function SuggestToWeb({ allCharacters, selectedCharacter, userCharacters, handleNewDetails, webOfTeam,  addToWebOfTeam, removeFromWebOfTeam, allCharactersLoading, showCharactersInSelectedDeck, userDeckData, selectedDeck }) {
  // these allow the selected options in the SuggestForm to be passed into the SuggestCards
  const [statsSelectedOptions, setStatsSelectedOptions] = useState("None");
  const handleStatsSelectedOptions = (event) => {
    setStatsSelectedOptions(event.target.value);
  };
  
  // this console.log brings up a lot of repatative values, is that okay?
  // console.log(userCharacters)
  const [filteredSuggestedCharacters, setFilteredSuggestedCharacters] = useState([])

  const selectedLinks = selectedCharacter.link_skill;

  const linkedCharacters = allCharacters.filter(character => {
    const characterLinks = character.link_skill;
    return characterLinks.some(link => selectedLinks.includes(link));
  });

  //TODO: this is making a function with filterData passed in, then setting the state for filtered characters to the filterData
  const filterAndSetSuggestedCharacters = (filterData) => setFilteredSuggestedCharacters(getFilteredCharacters(linkedCharacters, userCharacters, filterData));
  // console.log(filteredSuggestedCharacters)

  //TODO: this is then the array of arrays (characters paired by how many links match) 
  const charactersWithMatchedLinks = groupCharactersByLinkCount(filteredSuggestedCharacters, selectedCharacter.link_skill);
  // console.log(charactersWithMatchedLinks)

  return (
    <div className="">
      <Web webOfTeam={webOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} allCharactersLoading={allCharactersLoading} />

      <div className="row-span-2 px-2 pb-2">
        <div className="flex justify-around items-center">
          {/* image on mobile */}
          <div className="w-[100px] card-sm:w-[120px]">
              <CharacterCard individualCharacter={selectedCharacter} mobileSize={'85px'} desktopSize={'85px'}/>
          </div>

          <SuggestForm 
          onFormChange={filterAndSetSuggestedCharacters}
          statsSelectedOptions={statsSelectedOptions}
          setStatsSelectedOptions={setStatsSelectedOptions}
          handleStatsSelectedOptions={handleStatsSelectedOptions}
          allCharactersLoading={allCharactersLoading}
          />
        </div>
        
        <div className="h-[28vh] overflow-auto">
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
      <div className="flex flex-wrap min-h-[95px] max-h-[190px] card-sm:min-h-[95px] card-sm:max-h-[190px] justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto relative">
        {charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id && character.glb_date !== null).map((character) => (
          <div 
          id='CharacterCard'
          key={'suggest' + character.id.toString()}
          >
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
