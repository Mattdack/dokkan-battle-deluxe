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

  return (
    <div className="h-full grid grid-cols-6 gap-6">
      <div className="flex flex-col col-span-3 place-items-center max-h-1/3">
        <h2 className="h-min-10 flex flex-col bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black rounded-lg text-center lg:text-2xl">
          {cardDetails.name}
        </h2>
      </div>
      
        <div className="col-start-1 col-span-3 w-fit relative top-[3px] right-[8px]">
          <div
            onClick={() => {}}
            className="h-48 w-48 m-2 gap-4 bg-no-repeat relative z-50"
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
                ? "h-[48px] absolute top-[136px] right-[116px] z-50"
                : "h-[56px] absolute top-[130px] right-[130px] z-50"
            }
            src={characterStyling.getCharacterRarityBackground(cardDetails)}
            alt=""
          />
          <img
            className="w-40 absolute top-[15px] right-[25px] z-0"
            src={characterStyling.getCharacterTypeBackground(cardDetails)}
            alt=""
          />
          <img
            className="w-20 absolute top-[-12px] right-[4px] z-50"
            src={characterStyling.getCharacterTypeText(cardDetails)}
            alt=""
          />
        </div>


      <div className="col-span-3 col-start-4 pt-2 pr-2">
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 w-full h-min">
          <p>Leader Skill: {cardDetails.ls_description}</p>
        </div>

        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 w-full h-min">
          <p>
            {cardDetails.sa_name}: {cardDetails.sa_description}
          </p>
        </div>
      </div>

      <div className='col-span-3 col-start-1'>
        {Auth.loggedIn() ? (
          <div>
            {userCharacterIds.includes(cardDetails.id) ? (
              <div className="bg-orange-300 hover:bg-orange-400 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
                <button
                  onClick={() => {
                    handleRemoveCharacter();
                  }}
                  className="w-full h-full relative m-0.5 pr-10 pl-10 pt-2 pb-2"
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
                  className="w-full h-full relative m-0.5 pr-10 pl-10 pt-2 pb-2"
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

      <div className="h-1/3 grid grid-cols-2 col-span-6">
        <div className="h-1/2">
          <h1>Character Links:</h1>
          <div className="h-full border-2 border-black rounded-md overflow-auto">
            {cardDetails.link_skill &&
              cardDetails.link_skill.map((linkText) => {
                return (
                  <div>
                    <h2 className="h-min-10 flex flex-wrap bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]">
                      {linkText}
                    </h2>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="h-1/2">
          <h1>Character Categories</h1>
          <div className="h-full border-2 border-black rounded-md overflow-auto">
            {cardDetails.category &&
              cardDetails.category.map((categoryText) => {
                return (
                  <h2 className="h-min-10 flex flex-wrap bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]">
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
