import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_7LINKS } from "../util/queries";
import SuggestCard from "./SuggestCard";
import SuggestForm from "./SuggestForm";
import Web from "./Web";
import { add, countBy, groupBy } from "lodash";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"


function SuggestToWeb({ selectedCharacter, userCharacters, handleNewDetails, webOfTeam,  addToWebOfTeam, removeFromWebOfTeam }) {
  // this console.log brings up a lot of repatative values, is thatokay?
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

  // this useEffect allows the inital load of Suggested Characters to be placed in. Without it, they are blank until the form changes
  useEffect(() => {
    setFilteredSuggestedCharacters(linkedCharacters)
  }, [linkedCharacters]);

  
  //TODO: this is making a function with filterData passed in, then setting the state for filtered characters to the filterData
  const filterAndSetSuggestedCharacters = (filterData) => setFilteredSuggestedCharacters(getFilteredCharacters(linkedCharacters, userCharacters, filterData));
  // console.log(filteredSuggestedCharacters)

  //TODO: this is then the array of arrays (characters paired by how many links match) 
  const charactersWithMatchedLinks = groupCharactersByLinkCount(filteredSuggestedCharacters, selectedCharacter.link_skill);
  // console.log(charactersWithMatchedLinks)



  return (
    <div className="my-2">
      <Web webOfTeam={webOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} />

      <div className="row-span-2 h-[12vh] px-2 pb-2">

        {/* image */}
        <div className="flex justify-around items-center">
          <div className="lg:hidden w-[100px] card-sm:w-[120px]">
            <div className="w-fit relative">
              <>
              <img
                className="h-[80px] card-sm:h-[100px] card-sm:w-[100px] w-[80px] bg-no-repeat relative z-50"
                src={`https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(selectedCharacter)}_thumb.png`}
                alt={selectedCharacter.name}
              ></img>
              {selectedCharacter.rarity && (
                <img
                  src={characterStyling.getCharacterRarityBackground(selectedCharacter)}
                  className={
                    selectedCharacter.rarity.trim() === "UR"
                      ? "h-[20px] card-sm:h-[25px] absolute bottom-[6%] left-[-5%] z-50"
                      : "h-[25px] card-sm:h-[34px] absolute bottom-[5.5%] left-[0%] z-50"
                  }
                />
              )}
              <img
                className="w-[65px] card-sm:w-[81px] absolute top-[13%] right-[9.5%] z-0"
                src={characterStyling.getCharacterTypeBackground(selectedCharacter)}
              />
              <img
                className="w-[30px] card-sm:w-[40px] absolute top-[0%] right-[-2%] z-50"
                src={characterStyling.getCharacterTypeText(selectedCharacter)}
              />
              </>
            </div>   
          </div>

          <SuggestForm 
          onFormChange={filterAndSetSuggestedCharacters} 
          isDisabled={isLinkedCharactersLoading}
          />
        </div>

        <div className="h-[33vh] card-sm:h-[35vh] overflow-auto">
          <CharacterLinkDisplay matchCount={7} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} />
          <CharacterLinkDisplay matchCount={6} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={5} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={4} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={3} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
        </div>
      </div>
    </div>
  );
}
// this first conditional render checks to see if there are characters with matched links, then under the specific # of links matched, it filters out characters with the same name and ID, if there are no characters, then nothing is appended to the page

const CharacterLinkDisplay = ({matchCount, selectedCharacter, charactersWithMatchedLinks, handleNewDetails,  addToWebOfTeam}) => {
  return (
    <>
    {charactersWithMatchedLinks && charactersWithMatchedLinks[matchCount] && charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).length > 0 ? 
    <>
      <h3 className="h-fit font-header text-start text-md card-sm:text-xl">Characters with {matchCount} Links:</h3>
      <div className="flex flex-wrap h-[100px] card-sm:h-[120px] justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto relative">
        {charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).map((character) => (
          <div key={character.id}>
            <SuggestCard
              character={character}
              selectedCharacter={selectedCharacter}
              handleNewDetails={handleNewDetails}
              addToWebOfTeam={addToWebOfTeam}
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
    console.log(character)
    return (
      (!filterData.searchTermSuggest || character.name.toLowerCase().includes(filterData.searchTermSuggest.toLowerCase())) &&
      (!filterData.characterCategorySuggest || character.category.includes(filterData.characterCategorySuggest)) &&
      (!filterData.characterTypeSuggest || character.type.includes(filterData.characterTypeSuggest))
    );
  });
};


export default SuggestToWeb;
