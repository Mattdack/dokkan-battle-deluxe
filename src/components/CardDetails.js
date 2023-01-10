import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHARACTER, REMOVE_CHARACTER } from "../util/mutations";
import Auth from "../util/auth";

function CardDetails({ cardDetails, userCharacters }) {
  const [saveCharacter, { error: saveCharacterError, data: saveCharacterData }] = useMutation(ADD_CHARACTER);
  const [removeCharacter, { error: removeCharacterError, data: removeCharacterData }] =
    useMutation(REMOVE_CHARACTER);

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
  }

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-max rounded-lg">
        <h2 className="ml-1 mt-2 text-center text-4xl">{cardDetails.name}</h2>
      </div>
      <div>
        <div>

            <div className="relative">
              <div
                onClick={() => {}}
                className="h-48 w-48 m-2 gap-4 bg-no-repeat relative z-50"
                style={{
                  backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${getChracterThumbNail(cardDetails)}_thumb.png")`,
                  backgroundSize: `100%`,
                }}
              ></div>
              <img
                className={
                  cardDetails.rarity.trim() === "UR"
                    ? "h-[48px] absolute top-[136px] right-[116px] z-50"
                    : "h-[56px] absolute top-[130px] right-[130px] z-50"
                }
                src={getCharacterRarityBackground(cardDetails)}
                alt=""
              />
              <img
                className="w-40 absolute top-[15px] right-[25px] z-0"
                src={getCharacterTypeBackground(cardDetails)}
                alt=""
              />
              <img
                className="w-20 absolute top-[-12px] right-[4px] z-50"
                src={getCharacterTypeText(cardDetails)}
                alt=""
              />
            </div>
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
            {cardDetails.link_skill &&
              cardDetails.link_skill.map((linkText) => {
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

const getChracterThumbNail = (cardDetails) => {
  if(!cardDetails.thumb) {
    return cardDetails.art;
  } else {
    return cardDetails.thumb;
  }
}

const getCharacterRarityBackground = (cardDetails) => {
  if (cardDetails.rarity.trim() === "UR") {
    return process.env.PUBLIC_URL + "/dokkanIcons/rarities/UR.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/rarities/LR.png";
  }
};

const getCharacterTypeBackground = (cardDetails) => {
  if (cardDetails.type.includes("PHY")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png";
  } else if (cardDetails.type.includes("AGL")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png";
  } else if (cardDetails.type.includes("STR")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/str-background.png";
  } else if (cardDetails.type.includes("INT")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/int-background.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/teq-background.png";
  }
};

const getCharacterTypeText = (cardDetails) => {
  if (cardDetails.type.trim() === "EPHY" || cardDetails.type === "PHY-E") {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/ephy.png";
  } else if (
    cardDetails.type.trim() === "SPHY" ||
    cardDetails.type === "PHY-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sphy.png";
  } else if (
    cardDetails.type.trim() === "EAGL" ||
    cardDetails.type === "AGL-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eagl.png";
  } else if (
    cardDetails.type.trim() === "SAGL" ||
    cardDetails.type === "AGL-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sagl.png";
  } else if (
    cardDetails.type.trim() === "ESTR" ||
    cardDetails.type === "STR-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/estr.png";
  } else if (
    cardDetails.type.trim() === "SSTR" ||
    cardDetails.type === "STR-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sstr.png";
  } else if (
    cardDetails.type.trim() === "EINT" ||
    cardDetails.type === "INT-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eint.png";
  } else if (
    cardDetails.type.trim() === "SINT" ||
    cardDetails.type === "INT-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sint.png";
  } else if (
    cardDetails.type.trim() === "EINT" ||
    cardDetails.type === "INT-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eint.png";
  } else if (
    cardDetails.type.trim() === "STEQ" ||
    cardDetails.type === "TEQ-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/steq.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eteq.png";
  }
};

export default CardDetails;
