import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_7LINKS } from "../util/queries";
import SuggestCard from "./SuggestCard";
import Web from "./Web";
import { add, countBy, groupBy } from "lodash";

function SuggestToWeb({ selectedCharacter, handleNewDetails, webOfTeam,  addToWebOfTeam, removeFromWebOfTeam }) {

  const {loading: isLinkedCharactersLoading,data:linkedCharactersData,} = useQuery(QUERY_7LINKS, {
    variables: {
      link1: selectedCharacter.link_skill[0],
      link2: selectedCharacter.link_skill[1],
      link3: selectedCharacter.link_skill[2],
      link4: selectedCharacter.link_skill[3],
      link5: selectedCharacter.link_skill[4],
      link6: selectedCharacter.link_skill[5],
      link7: selectedCharacter.link_skill[6],
    },
  });

  const linkedCharacters = linkedCharactersData?.characters7Link || [];

  const countedLinks = groupCharactersByLinkCount(linkedCharacters, selectedCharacter.link_skill);

  return (
    <div className="h-full my-2">
      <Web webOfTeam={webOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} />

      <div className="h-[48vh] lg:h-[43vh] row-span-2 p-2 overflow-auto">
        <div className="h-full">
          <CharacterLinkDisplay matchCount={7} selectedCharacter={selectedCharacter} countedLinks={countedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam} />
          <CharacterLinkDisplay matchCount={6} selectedCharacter={selectedCharacter} countedLinks={countedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={5} selectedCharacter={selectedCharacter} countedLinks={countedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={4} selectedCharacter={selectedCharacter} countedLinks={countedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
          <CharacterLinkDisplay matchCount={3} selectedCharacter={selectedCharacter} countedLinks={countedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={ addToWebOfTeam}/>
        </div>
      </div>
    </div>
  );
}

const CharacterLinkDisplay = ({matchCount, selectedCharacter, countedLinks, handleNewDetails,  addToWebOfTeam}) => {
  return (
    <>
    <h3 className="h-fit font-header text-start text-xl">Characters with {matchCount} Links:</h3>
    <div className="flex flex-wrap h-[120px] justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto relative">
      {/* with the characters found with matchedLinks (countedLinks) we are filtering them to ensure that the character with the same id or name is not included in the array, then we take that character to pass to SuggestCard */}
      {countedLinks[matchCount] && countedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).map((character) => (
            <div key={character.id}>
              <SuggestCard
                character={character}
                handleNewDetails={handleNewDetails}
                 addToWebOfTeam={ addToWebOfTeam}
              />
            </div>
          ))}
    </div>
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

export default SuggestToWeb;
