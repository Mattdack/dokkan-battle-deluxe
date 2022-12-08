import React from "react";

function Details() {
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
            <h2 className="m-2">Character Name</h2>
            <h3 className="m-2">Leader Ability</h3>
            </div>
      </div>
      <div className="flex flex-row p-4 justify-between">
        <h4 className="m-2">Super Skill</h4>
        <h4 className="m-2"> HP Stat </h4>
        <h4 className="m-2"> Atk Stat </h4>
        <h4 className="m-2"> Def Stat </h4>
        <h4 className="m-2"> Cost Stat </h4>
      </div>

    </div>
  );
}

export default Details;
