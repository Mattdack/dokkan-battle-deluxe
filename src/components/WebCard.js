import React, { useState, useEffect, useRef, memo } from "react";

function WebCard({ data }) {

  let prevCharacterId = useRef(data.characterId);

  const [characterThumb, setCharacterThumb] = useState([]);

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    // Run the query and update the "data" state.
    if (data.characterThumb === null) {
      setCharacterThumb(data.characterArt);
    } else {
      setCharacterThumb(data.characterThumb);
    }
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = data.characterId;
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
          <h4 className="">{data.characterId}</h4>
        </div>
      </div>
    </div>
  );
}

export default memo(WebCard);