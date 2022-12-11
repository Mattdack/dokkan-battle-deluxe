import React from "react";

function Details() {
  return (
    <div className="bg-gradient-radial from-purple-300 via-purple-400 to-purple-800 rounded-md m-2 border-2 border-black">
      <div className="rounded-md m-2 flex">
        <div>
          <img
            className="h-24 w-24 m-8 border-2 border-black"
            style={{
              backgroundImage: `url("https://placedog.net/50/50?random")`,
              backgroundSize: `100%`,
            }}
          >
          </img>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-40 mt-4 ml-14">
          <h2 className="ml-1 mt-2 text-center">Name</h2>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-40 mt-4 ml-20">
          <h2 className="ml-1 mt-2 text-center">Leader Skill</h2>
        </div>
      </div>
      <div className="rounded-md my-8 flex">
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">Super Skill</h4>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">HP Stat</h4>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">Atk Stat</h4>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">Def Stat</h4>
        </div>
        <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black w-1/5 h-20 p-5 mx-5">
          <h4 className="">Cost Stat</h4>
        </div>
      </div>
    </div>
  )
};


export default Details;
