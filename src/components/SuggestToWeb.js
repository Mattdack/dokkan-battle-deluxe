import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_7LINKS } from "../util/queries";
import SingleCard from "./SingleCard";
import Web from "./Web";
import { countBy, groupBy } from "lodash";

function SuggestToWeb({ selectedCharacter, handleNewDetails, webOfTeam }) {
  const {
    loading: isLinkedCharactersLoading,
    data:linkedCharactersData,
  } = useQuery(QUERY_7LINKS, {
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

  const countedLinks = groupCharactersByLinkCount(
    linkedCharacters,
    selectedCharacter.link_skill
  );

  return (
    <div className="h-full my-2">
      <Web webOfTeam={webOfTeam} />

      <div className="h-[60vh]row-span-2 p-2">
        <div className="flex flex-col h-full justify-end">
          {/* <CharacterLinkDisplay matchCount={7} countedLinks={countedLinks} handleNewDetails={handleNewDetails}/> */}
          <CharacterLinkDisplay matchCount={6} countedLinks={countedLinks} handleNewDetails={handleNewDetails}/>
          <CharacterLinkDisplay matchCount={5} countedLinks={countedLinks} handleNewDetails={handleNewDetails}/>
          <CharacterLinkDisplay matchCount={4} countedLinks={countedLinks} handleNewDetails={handleNewDetails}/>
          <CharacterLinkDisplay matchCount={3} countedLinks={countedLinks} handleNewDetails={handleNewDetails}/>
          
        </div>
      </div>
    </div>
  );
}

const CharacterLinkDisplay = ({matchCount, countedLinks, handleNewDetails}) => (
  <>
  <h3>Characters with {matchCount} Links:</h3>
  <div className="grid grid-cols-5 h-[120px] max-w-full bg-gradient-radial from-purple-200 via-purple-100 to-purple-50  m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
    {countedLinks[matchCount] &&
      countedLinks[matchCount].map((character) => (
        <div
          key={character.id}
          onClick={() => {
            handleNewDetails(character);
          }}
        >
          <SingleCard
            characterId={character.id}
            characterThumb={character.thumb}
            characterArt={character.art}
            characterType={character.type}
            characterRarity={character.rarity}
          />
        </div>
      ))}
  </div>
  </>
  );

function groupCharactersByLinkCount(otherCharacters, selectedCharacterLinks,) {
  return groupBy(otherCharacters, (character) => {
    // result is { true: includesCount, false: missingCount }
    const result = countBy(
      character.link_skill || [],
      (linkSkill) => selectedCharacterLinks.includes(linkSkill)
    );
    return result.true;
  });
}

export default SuggestToWeb;
