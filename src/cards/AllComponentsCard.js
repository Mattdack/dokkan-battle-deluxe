import React, { useState, useEffect, useRef, useMemo, memo } from "react";

import CharacterCard from "./CharacterCard";

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

  return (
    <button
      ref={ref}
      onClick={() => handleCardClick(character)}
      className={`
      ${isInWeb ? "bg-slate-900/[.75] hover:bg-slate-900/[.9]" : ""}
      ${showCharactersInSelectedDeck && isInSelectedDeck ? "grayscale" : ""} 
      w-fit relative hover:bg-slate-900/[.4]
      `}
    >
      {isCardClicked && (
        <button>
          {isInWeb ? (
            <button
              className={`flex h-[60px] card-sm:h-[85px] w-[60px] card-sm:w-[85px] border-2 card-sm:border-4 border-black font-header text-sm card-sm:text-lg justify-center items-center text-center bg-red-500 hover:bg-red-700 rounded-lg absolute z-[900]`}
              onClick={() => removeFromWebOfTeam(character)}
            >
              Remove From Team
            </button>
          ) : (
            <button
              className={`flex h-[60px] card-sm:h-[85px] w-[60px] card-sm:w-[85px] border-2 card-sm:border-4 border-black font-header text-sm card-sm:text-lg justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-lg absolute z-[900]`}
              onClick={() => addToWebOfTeam(character)}
            >
              Add To Team
            </button>
          )}
        </button>
      )}
      <button>
        <CharacterCard
          individualCharacter={character}
          mobileSize={"60px"}
          desktopSize={"85px"}
        />
      </button>
    </button>
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
      ${isSavedCharacter ? "bg-amber-900/[.75] hover:bg-amber-900/[.9]" : "hover:bg-slate-900/[.4]"} 
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
