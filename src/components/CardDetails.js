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
            <h2 className="m-2 h-24 bg-slate-500">Character Name</h2>
            <h3 className="m-2 h-24 bg-slate-500">Leader Ability</h3>
            </div>
      </div>
      <div className="flex flex-row p-4 justify-between">
        <h4 className="m-2 h-24 w-24 bg-slate-500">Super Skill</h4>
        <h4 className="m-2 h-24 w-24 bg-slate-500"> HP Stat </h4>
        <h4 className="m-2 h-24 w-24 bg-slate-500"> Atk Stat </h4>
        <h4 className="m-2 h-24 w-24 bg-slate-500"> Def Stat </h4>
        <h4 className="m-2 h-24 w-24 bg-slate-500"> Cost Stat </h4>
      </div>
    </div>
  );
}

export default Details;
