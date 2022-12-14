import React from "react";
import SingleCard from "./SingleCard";

function Web(props) {
  const webbedCharacters = props.webOfTeam;

  return (
    <div className="h-80">
      <div className="h-full bg-slate-700 row-span-6 rounded-md">
        {webbedCharacters &&
          webbedCharacters.map((character) => (
            <div key={character.id}>
              <SingleCard
                characterId={character.id}
                characterLinks={character.link_skill}
                characterThumb={character.thumb}
                characterArt={character.art}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Web;
