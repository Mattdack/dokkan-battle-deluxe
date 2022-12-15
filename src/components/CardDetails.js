import React, { useState, useEffect, useRef } from "react";

function CardDetails({ cardDetails }) {
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
        "h-[28px] absolute top-[80px] right-[68px] z-50"
      );
      setCharacterRarity("/dokkanIcons/rarities/UR.png");
    } else {
      setCharacterRarityPosition(
        "h-[35px] absolute top-[72px] right-[70px] z-50"
      );
      setCharacterRarity("/dokkanIcons/rarities/LR.png");
    }

    if (
      cardDetails.type === "EPHY" ||
      cardDetails.type === "EPHY " ||
      cardDetails.type === "PHY-E"
    ) {
      setCharacterType("/dokkanIcons/types/phy-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/ephy.png");
    } else if (
      cardDetails.type === "SPHY" ||
      cardDetails.type === "SPHY " ||
      cardDetails.type === "PHY-S"
    ) {
      setCharacterType("/dokkanIcons/types/phy-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/sphy.png");
    } else if (
      cardDetails.type === "EAGL" ||
      cardDetails.type === "SPHY " ||
      cardDetails.type === "AGL-E"
    ) {
      setCharacterType("/dokkanIcons/types/agl-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/eagl.png");
    } else if (
      cardDetails.type === "SAGL" ||
      cardDetails.type === "SAGL " ||
      cardDetails.type === "AGL-S"
    ) {
      setCharacterType("/dokkanIcons/types/agl-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/sagl.png");
    } else if (
      cardDetails.type === "ESTR" ||
      cardDetails.type === "ESTR " ||
      cardDetails.type === "STR-E"
    ) {
      setCharacterType("/dokkanIcons/types/str-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/estr.png");
    } else if (
      cardDetails.type === "SSTR" ||
      cardDetails.type === "SSTR " ||
      cardDetails.type === "STR-S"
    ) {
      setCharacterType("/dokkanIcons/types/str-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/sstr.png");
    } else if (
      cardDetails.type === "EINT" ||
      cardDetails.type === "EINT " ||
      cardDetails.type === "INT-E"
    ) {
      setCharacterType("/dokkanIcons/types/int-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/eint.png");
    } else if (
      cardDetails.type === "SINT" ||
      cardDetails.type === "SINT " ||
      cardDetails.type === "INT-S"
    ) {
      setCharacterType("/dokkanIcons/types/int-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/sint.png");
    } else if (
      cardDetails.type === "ETEQ" ||
      cardDetails.type === "ETEQ " ||
      cardDetails.type === "PHY-E"
    ) {
      setCharacterType("/dokkanIcons/types/teq-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/eteq.png");
    } else if (
      cardDetails.type === "STEQ" ||
      cardDetails.type === "STEQ " ||
      cardDetails.type === "TEQ-S"
    ) {
      setCharacterType("/dokkanIcons/types/teq-background.png");
      setCharacterSuperOrExtreme("/dokkanIcons/types/steq.png");
    }
  }, [characterId]);

  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <div>
          {characterThumb && (
            <div className="relative">
              <div
                onClick={() => {}}
                className="h-28 w-28 m-2 gap-4 bg-no-repeat relative z-50"
                style={{
                  backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterThumb}_thumb.png")`,
                  backgroundSize: `100%`,
                }}
              ></div>
              <img className={characterRarityPosition} src={characterRarity} />
              <img
                className="w-[80px] absolute top-[20px] right-[25px] z-0"
                src={characterType}
              />
              <img
                className="w-[40px] h-[40px] absolute top-[6px] right-[11px] z-50"
                src={characterSuperOrExtreme}
              />
            </div>
          )}
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-40 mt-4 ml-14">
          <h2 className="ml-1 mt-2 text-center">{cardDetails.name}</h2>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-40 mt-4 ml-20">
          <h2 className="ml-1 mt-2 text-center">Leader Skill</h2>
          <p>{cardDetails.ls_description}</p>
        </div>
      </div>
      <div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 w-36 mx-5">
          <h4 className="">{cardDetails.sa_name}</h4>
          <p>{cardDetails.sa_description}</p>
        </div>
        <h1>CharacterLinks Should Append Under This</h1>
        <div className="border-2 border-black">
          {characterLinks &&
            characterLinks.map((linkText) => {
              return(
              <div>
                <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">
                  {linkText}
                </h2>
              </div>
              )
            })}
        </div>

        <h1>Character Categories Should Append Under This</h1>

        <div className="border-2 border-black">
          {cardDetails.category &&
            cardDetails.category.map((categoryText) => {
              return (
              <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">
                {categoryText}
              </h2>
              )
            })}
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
