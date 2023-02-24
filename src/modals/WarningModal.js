import React, { useState } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_TEAM_FROM_DECK } from "../util/mutations"

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";

export default function WarningModal( {open, onClose, profileId, selectedDeck, team} ) {
  const [reamoveTeamFromDeck, { error: removeTeamFromDeckError, data: updatedRemoveTeamFromDeck }] = useMutation(REMOVE_TEAM_FROM_DECK)
  if (!open) return null;
  
  async function handleRemoveTeamFromDeck (){
    reamoveTeamFromDeck({
      variables:{
        profileId: profileId,
        deckId: selectedDeck?._id,
        teamId: team._id
      }
    })
    .then((result) => {
      onClose()
    })
    .catch((error) => {
    });
  }
  
  return ReactDom.createPortal(
     <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.4] z-[1000]">
        <div className="flex flex-wrap w-3/4 lg:w-1/3 p-14 rounded-lg shadow-lg text-lg font-bold fixed top-[30%] right-[13%] lg:top-[25%] lg:right-[33.5%] bg-white z-[1000]">
        <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
          <p>Are you sure you want to delete this team? All the information saved in this team will be deleted, including the strategy:</p>
          <p className="text-red-500">"{team.info.notes}"</p>
          <div className='flex w-full pt-10 justify-center items-center text-center'>
            <button className='p-2 border-4 border-black bg-red-400 hover:bg-red-600' onClick={() => handleRemoveTeamFromDeck()}>YES I WANT TO DELETE THIS TEAM</button>
          </div>  
        </div>
      </div>,
    document.getElementById("WarningModal")
  );
}
