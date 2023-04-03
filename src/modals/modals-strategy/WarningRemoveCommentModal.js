import React, { useState } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT_FROM_STAGE } from "../../util/mutations"

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";

export default function WarningRemoveCommentModal( {open, onClose, profileId, selectedStageId, commentId} ) {

  const [removeCommentFromStage, { error: removeCommentError, data: updatedStageCommentsData }] = useMutation(REMOVE_COMMENT_FROM_STAGE)
  if (!open) return null;
  
  async function handleRemoveComment (){
    removeCommentFromStage({
      variables:{
        userId: profileId,
        stageId: selectedStageId,
        commentId: commentId
      }
    })
    .then((result) => {
      console.log(result)
      onClose()
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  return ReactDom.createPortal(
     <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.4] z-[1000]">
        <div className="flex flex-wrap w-3/4 lg:w-1/3 max-h-[80%] px-10 py-14 rounded-lg shadow-lg text-lg font-bold fixed top-[10%] lg:top-[25%] right-[13%] lg:right-[33.5%] bg-white z-[1000] overflow-y-auto">
        <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
          <p>Are you sure you want to delete this comment? The comment and all the replies with it will be deleted?</p>
          {/* <p className="text-red-500">"{team.info.notes}"</p> */}
          <div className='flex w-full pt-10 justify-center items-center text-center'>
            <button className='p-2 border-4 border-black bg-red-400 hover:bg-red-600' onClick={() => handleRemoveComment()}>YES I WANT TO DELETE THIS COMMENT</button>
          </div>  
        </div>
      </div>,
    document.getElementById("WarningRemoveCommentModal")
  );
}
