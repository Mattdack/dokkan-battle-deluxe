import React, { useState, useEffect, useRef } from "react";

function CardDetails({ cardDetails }) {
  let characterId = cardDetails.id;
  let prevCharacterId = useRef(characterId);
  let characterLinks = cardDetails.link_skill;

  const [characterLinksLength, setCharacterLinksLength] = useState([]);

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    if (
      characterId !== prevCharacterId &&
      typeof characterLinks !== "undefined"
    ) {
      // Run the query and update the "data" state.
      console.log("change detected");
      if (characterLinks.length === 7) {
        console.log("seven links");
      } else if (characterLinks.length === 6) {
        console.log("six links");
      } else {
        console.log("five links or under");
      }
    }
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = characterId;
    console.log(prevCharacterId);
  }, [cardDetails]);

  return (
    <div className="bg-pink-500 rounded-md p-5 border-2 border-black h-screen m-2">
      <div className="flex flex-row items-center justify-evenly">
        <img
          className="h-24 w-24 border-2 border-black"
          style={{
            backgroundImage: `url("https://placedog.net/50/50?random")`,
            backgroundSize: `100%`,
          }}
        >
        </img>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black">
          <h2 className="text-center">Name</h2>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black">
          <h2 className="text-center">Leader Skill</h2>
        </div>
      </div>
      <div className="m-5">
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black h-16">
          <h4 className="">Super Skill</h4>
        </div>
        <div className="">
          <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
        </div>
        <div>
        <h2 className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] h-16">This is an example Link</h2>
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
