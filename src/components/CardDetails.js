import React, { useState, useEffect, useRef } from "react";

function CardDetails({ cardDetails }) {
  let characterId = cardDetails.id;
  let prevCharacterId = useRef(characterId);
  let characterLinks = cardDetails.link_skill;

  const [characterLinksLength, setCharacterLinksLength] = useState([]);
  const [characterThumb, setCharacterThumb] = useState([]);

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    console.log(cardDetails)
    if (
      characterId !== prevCharacterId &&
      typeof characterLinks !== "undefined"
    ) {
      // Run the query and update the "data" state.
      if (characterLinks.length === 7) {
        console.log("seven links");
      } else if (characterLinks.length === 6) {
        console.log("six links");
      } else {
        console.log("five links or under");
      }
    }

    if (cardDetails.thumb === null) {
      console.log("Thumb for selected toon is not present");
      setCharacterThumb(cardDetails.art)
    } else {
      console.log('thumb is present for selected toon')
      setCharacterThumb(cardDetails.thumb)
    }
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = characterId;
  }, [cardDetails]);

  return (
    <div className="bg-gradient-radial from-purple-300 via-purple-400 to-purple-800 rounded-md m-2 border-2 border-black">
      <div className="rounded-md m-2 flex">
        <div>
          {characterThumb && (
                  <div
                  onClick={() => {}}
                  className="h-24 md:h-32 lg:h-48 w-28 md:w-36 lg:w-48 m-2 gap-4 bg-no-repeat"
                  style={{
                    backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterThumb}_thumb.png")`,
                    backgroundSize: `100%`,
                  }}
                >
                  <div className="">
                    <h4 className="">{cardDetails.characterId}</h4>
                  </div>
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
      <div className="rounded-md my-8 flex">
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">{cardDetails.sa_name}</h4>
          <p>{cardDetails.sa_description}</p>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">HP Stat</h4>
          <p></p>
        </div>
        <div>
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
        </div>
        <div>
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
        </div>
        <div>
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
        <div>
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
        </div>
      </div>
    </div>
      </div >
  )
};


export default CardDetails;
