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
    <div className="row-span-2 bg-slate-700 rounded-md">
      <div className="flex flex-row p-4">
        <div
          className="h-28 w-28 position-fixed"
          style={{
            backgroundImage: `url("https://placedog.net/50/50?random")`,
            backgroundSize: `100%`,
          }}
        ></div>
        <div className="flex justify-between">
          <h2 className="m-2 h-24 bg-slate-500">
            Character Name: {cardDetails.name}
          </h2>
          <h3 className="m-2 h-24 bg-slate-500">
            Leader Ability: {cardDetails.ls_description}
          </h3>
          <h3 className="m-2 h-24 bg-slate-500">
            Passive Ability: {cardDetails.ps_description}
          </h3>
        </div>
      </div>
      <div className="bg-slate-700 rounded-md p-4">
        <h2>Character Links:</h2>
        <div className="flex flex-row flex-wrap overflow-auto">
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 1</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 2</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 3</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 4</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 5</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 6</h2>
          <h2 className="bg-slate-500 rounded-lg w-fit m-1">link skill 7</h2>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
