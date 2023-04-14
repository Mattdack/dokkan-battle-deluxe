import React, { useState, useEffect, useRef, useMemo, memo } from "react";

import CharacterCard from "./CharacterCard";
import ServerCharacterCard from "./ServerCharacterCard"

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

  return (
    <div
      className={`
      ${isInWeb ? "bg-slate-900/[.5] hover:bg-slate-900/[.9]" : "hover:bg-slate-900/[.3]"}
      ${showCharactersInSelectedDeck && isInSelectedDeck ? "grayscale" : ""} 
      w-fit h-fit relative
      `}
    >
      <div>
        <CharacterCard
          individualCharacter={character}
          mobileSize={"60px"}
          desktopSize={"85px"}
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

  return (
    <>
      <div 
      className={`
      ${isSavedCharacter ? "bg-amber-900/[.75] hover:bg-amber-900/[.9]" : "hover:bg-amber-900/[.4]"} 
      `}
      >
        <CharacterCard
          individualCharacter={character}
          mobileSize={"60px"}
          desktopSize={"85px"}
        />
      </div>
    </>
  );
}

export default AllComponentsCard;
