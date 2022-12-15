import React, { useState, useEffect, useRef } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_CHARACTER, REMOVE_CHARACTER } from "../util/mutations";
import Auth from "../util/auth";

function CardDetails({ cardDetails, userCharacters, handleCardDetailsReload }) {
  const [saveCharacter, { error, data }] = useMutation(ADD_CHARACTER);
  const [removeCharacter, { error: error2, data: data2 }] =
    useMutation(REMOVE_CHARACTER);

  let characterId = cardDetails.id;
  let prevCharacterId = useRef(characterId);

  const [characterThumb, setCharacterThumb] = useState("");
  const [characterThumbURL, setCharacterThumbURL] = useState("");

  const [characterRarity, setCharacterRarity] = useState("");
  const [characterRarityPosition, setCharacterRarityPosition] = useState("");

  const [characterType, setCharacterType] = useState("");
  const [characterSuperOrExtreme, setCharacterSuperOrExtreme] = useState("");
  const [characterLinks, setCharacterLinks] = useState([]);

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    if (cardDetails.thumb === null) {
      // console.log("Thumb for selected toon is not present");
      setCharacterThumb(cardDetails.art);
    } else {
      // console.log('thumb is present for selected toon')
      setCharacterThumb(cardDetails.thumb);
    }
    // Update the "prevCharacter" variable with the current cardDetails
    prevCharacterId = characterId;
  }, [cardDetails]);

  useEffect(() => {
    console.log(cardDetails);
    if (cardDetails.thumb === null) {
      setCharacterThumb(cardDetails.art);
    } else {
      setCharacterThumb(cardDetails.thumb);
    }

    if (cardDetails.link_skill !== null) {
      setCharacterLinks(cardDetails.link_skill);
    }
    console.log(cardDetails.link_skill);

    if (cardDetails.rarity === "UR" || cardDetails.rarity === "UR ") {
      setCharacterRarityPosition(
        "h-[48px] absolute top-[136px] right-[116px] z-50"
      );
      setCharacterRarity(process.env.PUBLIC_URL + "/dokkanIcons/rarities/UR.png");
    } else {
      setCharacterRarityPosition(
        "h-[56px] absolute top-[130px] right-[130px] z-50"
      );
      setCharacterRarity(process.env.PUBLIC_URL + "/dokkanIcons/rarities/LR.png");
    }

    if (
      cardDetails.type === "EPHY" ||
      cardDetails.type === "EPHY " ||
      cardDetails.type === "PHY-E"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/phy-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/ephy.png");
    } else if (
      cardDetails.type === "SPHY" ||
      cardDetails.type === "SPHY " ||
      cardDetails.type === "PHY-S"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/phy-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/sphy.png");
    } else if (
      cardDetails.type === "EAGL" ||
      cardDetails.type === "SPHY " ||
      cardDetails.type === "AGL-E"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/eagl.png");
    } else if (
      cardDetails.type === "SAGL" ||
      cardDetails.type === "SAGL " ||
      cardDetails.type === "AGL-S"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/sagl.png");
    } else if (
      cardDetails.type === "ESTR" ||
      cardDetails.type === "ESTR " ||
      cardDetails.type === "STR-E"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/str-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/estr.png");
    } else if (
      cardDetails.type === "SSTR" ||
      cardDetails.type === "SSTR " ||
      cardDetails.type === "STR-S"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/str-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/sstr.png");
    } else if (
      cardDetails.type === "EINT" ||
      cardDetails.type === "EINT " ||
      cardDetails.type === "INT-E"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/int-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/eint.png");
    } else if (
      cardDetails.type === "SINT" ||
      cardDetails.type === "SINT " ||
      cardDetails.type === "INT-S"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/int-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/sint.png");
    } else if (
      cardDetails.type === "ETEQ" ||
      cardDetails.type === "ETEQ " ||
      cardDetails.type === "PHY-E"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/teq-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/eteq.png");
    } else if (
      cardDetails.type === "STEQ" ||
      cardDetails.type === "STEQ " ||
      cardDetails.type === "TEQ-S"
    ) {
      setCharacterType(process.env.PUBLIC_URL + "/dokkanIcons/types/teq-background.png");
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + "/dokkanIcons/types/steq.png");
    }
  }, [characterId]);

  function handleSaveCharacter() {
    const username = Auth.getProfile().data.username;
    saveCharacter({
      variables: {
        username: username,
        dokkanId: cardDetails.id,
      },
    }).then((result) => {
      console.log(result);
    });
    handleCardDetailsReload(cardDetails);
  }

  function handleRemoveCharacter() {
    const username = Auth.getProfile().data.username;
    removeCharacter({
      variables: {
        username: username,
        dokkanId: cardDetails.id,
      },
    }).then((result) => {
      console.log(result);
    });
     handleCardDetailsReload(cardDetails);
  }

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-max rounded-lg">
        <h2 className="ml-1 mt-2 text-center text-4xl">{cardDetails.name}</h2>
      </div>
      <div>
        <div>
          {characterThumb && (
            <div className="relative">
              <div
                onClick={() => {}}
                className="h-48 w-48 m-2 gap-4 bg-no-repeat relative z-50"
                style={{
                  backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterThumb}_thumb.png")`,
                  backgroundSize: `100%`,
                }}
              ></div>
              <img className={characterRarityPosition} src={characterRarity} />
              <img
                className="w-40 absolute top-[15px] right-[25px] z-0"
                src={characterType}
              />
              <img
                className="w-20 absolute top-[-12px] right-[4px] z-50"
                src={characterSuperOrExtreme}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 w-[85%] h-min">
        <p>Leader Skill: {cardDetails.ls_description}</p>
      </div>

      <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 w-[85%] h-min">
        <p>
          {cardDetails.sa_name}: {cardDetails.sa_description}
        </p>
      </div>
      <div>
            {Auth.loggedIn() ? (
              <div>
                {userCharacters.includes(cardDetails.id) ? (
                  <div className="bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
                    <button
                      onClick={() => {
                        handleRemoveCharacter();
                      }}
                      className="relative hover:bg-orange-400 m-0.5 pr-10 pl-10 pt-2 pb-2"
                    >
                      Remove Character
                    </button>
                  </div>
                ) : (
                  <div className="bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
                  <button
                    onClick={() => {
                      handleSaveCharacter();
                    }}
                    className="relative hover:bg-orange-400 m-0.5 pr-10 pl-10 pt-2 pb-2"
                  >
                    Add character
                  </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h1>Log in to add characters</h1>
              </div>
            )}
          </div>

      <div className="grid grid-cols-2">
        <div className="m-4 h-full max-h-[60vh]">
          <h1>Character Links:</h1>
          <div className="border-2 border-black">
            {characterLinks &&
              characterLinks.map((linkText) => {
                return (
                  <div>
                    <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-10">
                      {linkText}
                    </h2>
                  </div>
                );
              })}
          </div>
          
        </div>
        <div className="m-4 h-full max-h-[60vh]">
          <h1>Character Categories</h1>

          <div className="border-2 border-black rounded-md h-fit min-h-fit max-h-[32.5vh] overflow-auto">
            {cardDetails.category &&
              cardDetails.category.map((categoryText) => {
                return (
                  <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-10">
                    {categoryText}
                  </h2>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
