import React from "react";

export default function Style( {cardDetails} ) {
  return (
    <div className="h-[30%] flex overflow-y-auto bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-2 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
      {cardDetails.ps_name}: {cardDetails.ps_description}
    </div>
  );
}
