import React, { useState, useEffect, useRef } from "react";

function SingleCard(props) {
  let characterId = props.characterId;
  let prevCharacterId = useRef(characterId);
  let characterLinks = props.link_skill;

  const [characterThumb, setCharacterThumb] = useState([]);

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    // Run the query and update the "data" state.
    if (props.characterThumb === null) {
      setCharacterThumb(props.characterArt);
    } else {
      setCharacterThumb(props.characterThumb);
    }
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = characterId;
  }, []);

  return (
    <div>
      <div
        onClick={() => {}}
        className="h-20 md:h-28 lg:h-20 w-20 md:w-28 lg:w-20 m-2 gap-4 bg-no-repeat"
        style={{
          backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterThumb}_thumb.png")`,
          backgroundSize: `100%`,
        }}
      >
        <div className="">
          <h4 className="">{props.characterId}</h4>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
