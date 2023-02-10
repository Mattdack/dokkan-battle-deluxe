import React, { useState, useEffect, useRef } from "react";
import * as characterStyling from "../util/characterCardStyling";

function AllComponentsCard({ character, multiCardSelection, webOfTeam, savedToDeck, addToWebOfTeam, handleNewDetails, changeDeck }) {
  console.log(multiCardSelection)
  if (!multiCardSelection){
    return <WebCard character={character} webOfTeam={webOfTeam} addToWebOfTeam={addToWebOfTeam} handleNewDetails={handleNewDetails} />
  } else {
    return <DeckCard character={character} savedToDeck={savedToDeck} changeDeck={changeDeck} />
  }
}

function WebCard ({character, webOfTeam, addToWebOfTeam, handleNewDetails }){
  // this valid image state is changed to false if the onError occurs on the img (basically a 404 handler)
  const [isImageValid, setIsImageValid] = useState(true);
  function handleImageError() {
    setIsImageValid(false);
  }
  
  const [isInWeb, setIsInWeb] = useState(webOfTeam.includes(character));
  // this useEffect sets the isInWeb (which is originally checking to see if a character is in the web). The map function makes a new array of all characters with just their ids. Then, if this is included, isInWeb is set to true, which will change the state of the ternary to make the background of the card change
  useEffect(() => {
    setIsInWeb(webOfTeam.map(char => char.id).includes(character.id));
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

  return (
    <>
      {isImageValid ? (
        <div 
        ref={ref}
        onClick={handleCardClick}
        className={`w-fit relative hover:bg-slate-900/[.4] 
        ${isInWeb ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}`}>
          {isCardClicked ? (
            <div>
              <div 
              className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-sm card-sm:text-md justify-center items-center text-center bg-sky-500 hover:bg-sky-700 rounded-t-lg"
              onClick={() =>  addToWebOfTeam(character)}
              >
              To Team
              </div>
              <div 
              className="flex w-[80px] card-sm:w-[100px] h-[40px] card-sm:h-[50px] border-4 border-black font-header text-xsm card-sm:text-md justify-center items-center text-center bg-orange-400 hover:bg-amber-600 rounded-b-lg"
              onClick={() => handleNewDetails(character.id)}
              >
              Suggestion
              </div>
            </div>
            ) : (
            <>
            <img
              className="h-[60px] card-sm:h-[100px] w-[60px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
              src={process.env.PUBLIC_URL + `/characterArt/${character.id}.png`}
              // onError={handleImageError}
              alt={character.name}
            >
            </img>
            {character.rarity && (
              <img
                src={characterStyling.getCharacterRarityBackground(character)}
                className={character.rarity.trim() === "UR"
                    ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                    : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
                }
              />
            )}
            <img
              className="w-[48px] card-sm:w-[81px] absolute top-[18%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
              src={characterStyling.getCharacterTypeBackground(character)}
            />
            <img
              className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
              src={characterStyling.getCharacterTypeText(character)}
            />
            </>
            )}
        </div>
      ) : null}
    </>
  );
}

function DeckCard ({character, savedToDeck, changeDeck}) {
  function handleImageError() {
    setIsImageValid(false);
  }
  const [isImageValid, setIsImageValid] = useState(true);
  
  //checking to see if the character.id is included in the array of character ids  
  const [isSavedCharacter, setIsSavedCharacter] = useState(savedToDeck.includes(character.id))
  // this use effect allows the setIsSavedCharacter to true/false depending on whether it is in the savedDeck or not (updates when new prop or character passed in)
  useEffect(() => {
    setIsSavedCharacter(savedToDeck.includes(character.id));
  }, [savedToDeck, character.id])
  
  return (
    <>
      {isImageValid ? (
        <div 
        onClick={changeDeck(character)}
        className={`w-fit relative
        ${isSavedCharacter ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
          <img
            className="h-[80px] card-sm:h-[100px] w-[80px] card-sm:w-[100px] bg-no-repeat relative z-50 right-[2%] card-sm:right-0"
            src={process.env.PUBLIC_URL + `/characterArt/${character.id}.png`}
            // onError={handleImageError}
            alt={character.name}
          >
          </img>
          {character.rarity && (
            <img
              src={characterStyling.getCharacterRarityBackground(character)}
              className={character.rarity.trim() === "UR"
              ? "h-[20px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
              : "h-[24px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
              }
            />
          )}
          <img
            className="w-[60px] card-sm:w-[81px] absolute top-[18%] card-sm:top-[13%] right-[12%] card-sm:right-[9.75%] z-0"
            src={characterStyling.getCharacterTypeBackground(character)}
          />
          <img
            className="w-[30px] card-sm:w-[40px] h-[30px] card-sm:h-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            src={characterStyling.getCharacterTypeText(character)}
          />
        </div>
      ) : null}
    </>
  );
}

export default AllComponentsCard;
