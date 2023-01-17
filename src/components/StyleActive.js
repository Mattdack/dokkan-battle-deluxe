import React from "react";

export default function StyleActive({ cardDetails }) {
  return (
    <div className="h-[30%] flex">
      <div className="w-1/2 h-full flex p-2 overflow-y-auto bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
        {cardDetails.ps_name}: {cardDetails.ps_description}
      </div>
      <div className="w-1/2 h-full flex p-2 overflow-y-auto bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 text-sm">
        {cardDetails.active_skill_name}:{cardDetails.active_skill_condition}
      </div>
    </div>
  );
}
