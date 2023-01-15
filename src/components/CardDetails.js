import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHARACTER, REMOVE_CHARACTER } from "../util/mutations";
import Auth from "../util/auth";
import * as characterStyling from "../util/characterCardStyling";


function CardDetails({ cardDetails, userCharacters }) {
  const [
    saveCharacter,
    { error: saveCharacterError, data: saveCharacterData },
  ] = useMutation(ADD_CHARACTER);
  const [
    removeCharacter,
    { error: removeCharacterError, data: removeCharacterData },
  ] = useMutation(REMOVE_CHARACTER);

  const userCharacterIds = userCharacters.map((character) => character.id);

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

  console.log(cardDetails);

  return (
    <div className="h-full flex flex-col">
      {/* name */}
      <div className="flex lg:h-[8%] w-full justify-center">
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black rounded-lg text-center lg:text-lg">
          {cardDetails.name}
        </h2>
      </div>

      <div className="w-full h-[30%] flex flex-wrap">
        {/* thumb and add button*/}
        <div className="w-1/2 flex flex-wrap justify-center items-center">
          <div className="w-fit relative">
            <div
              onClick={() => {}}
              className="h-[161px] w-[161px] bg-no-repeat relative z-50"
              style={{
                backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterStyling.getCharacterThumbNail(
                  cardDetails
                )}_thumb.png")`,
                backgroundSize: `100%`,
              }}
            ></div>
            <img
              className={
                cardDetails && cardDetails.rarity.trim() === "UR"
                  ? "h-[35px] absolute top-[112px] right-[98px] z-50"
                  : "h-[56px] absolute top-[92px] right-[92px] z-50"
              }
              src={characterStyling.getCharacterRarityBackground(cardDetails)}
              alt=""
            />
            <img
              className="w-[131px] absolute top-[20px] right-[15px] z-0"
              src={characterStyling.getCharacterTypeBackground(cardDetails)}
              alt=""
            />
            <img
              className="w-[65px] absolute top-[-1px] right-[-8px] z-50"
              src={characterStyling.getCharacterTypeText(cardDetails)}
              alt=""
            />
          </div>

          {/* add character button */}
          <div>
            {Auth.loggedIn() ? (
              <div>
                {userCharacterIds.includes(cardDetails.id) ? (
                  <div className="bg-orange-300 hover:bg-orange-400 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
                    <button
                      onClick={() => {
                        handleRemoveCharacter();
                      }}
                      className="w-full h-full text-center relative m-0.5 pr-10 pl-10 pt-2 pb-2"
                    >
                      Remove Character
                    </button>
                  </div>
                ) : (
                  <div className="bg-orange-300 hover:bg-orange-400 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
                    <button
                      onClick={() => {
                        handleSaveCharacter();
                      }}
                      className="w-full h-full text-center relative m-0.5 pr-10 pl-10 pt-2 pb-2"
                    >
                      Add character
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-center">Log in to add characters</h1>
              </div>
            )}
          </div>
        </div>

        {/* leader and super */}
        <div className="h-[50%] w-1/2 pt-2 pr-2">
          <div className="w-full h-full overflow-y-auto bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
            Leader Skill: {cardDetails.ls_description}
          </div>

          <div className="w-full h-full overflow-y-auto bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
            {cardDetails.sa_name}: {cardDetails.sa_description}
          </div>
        </div>
      </div>

      {/* passive, ultra, active, and/or transformation */}
      {characterStyling.getCardDetailStyling(cardDetails)}

      {/* links + categories */}
      <div className="h-[30%] grid grid-cols-2 bottom-0">
        <div className="border-2 border-black rounded-md overflow-auto text-sm">
          <h1>Character Links:</h1>
          <div className="">
            {cardDetails.link_skill &&
              cardDetails.link_skill.map((linkText) => {
                return (
                  <div>
                    <h2 className="h-min-10 flex flex-wrap bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] text-sm">
                      {linkText}
                    </h2>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="border-2 border-black rounded-md overflow-auto text-sm">
          <h1>Character Categories</h1>
          <div className="">
            {cardDetails.category &&
              cardDetails.category.map((categoryText) => {
                return (
                  <h2 className="h-min-10 flex flex-wrap bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 text-sm shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]">
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
