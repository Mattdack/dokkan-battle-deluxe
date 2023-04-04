import React, { useState } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_REPLY_FROM_COMMENT } from "../../util/mutations"

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";

export default function WarningRemoveReplyModal( {open, onClose, profileId, commentToRemoveReplyFrom, replyId, reloadCommentsReplies} ) {

  const [removeReplyFromComment, { error: replyRemoveError, data: replyRemovedData }] = useMutation(REMOVE_REPLY_FROM_COMMENT)

  if (!open) return null;
  
  function handleReplyDelete () {
    removeReplyFromComment({
      variables:{
        userId: profileId,
        commentId: commentToRemoveReplyFrom,
        replyId: replyId 
      }
    })
    .then((result) => {
      // console.log(result)
      onClose()
      reloadCommentsReplies()
    })
    .catch((error) => {
      // console.log(error)
    });
  }
  
  return ReactDom.createPortal(
     <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.4] z-[1000]">
        <div className="flex flex-wrap w-3/4 lg:w-1/3 max-h-[80%] px-10 py-14 rounded-lg shadow-lg text-lg font-bold fixed top-[10%] lg:top-[25%] right-[13%] lg:right-[33.5%] bg-white z-[1000] overflow-y-auto">
        <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
          <p>Are you sure you want to delete this reply? If a team was suggested, it will be deleted as well.</p>
          {/* <p className="text-red-500">"{team.info.notes}"</p> */}
          <div className='flex w-full pt-10 justify-center items-center text-center'>
            <button className='p-2 border-4 border-black bg-red-400 hover:bg-red-600' onClick={() => handleReplyDelete()}>YES I WANT TO DELETE THIS REPLY</button>
          </div>  
        </div>
      </div>,
    document.getElementById("WarningRemoveReplyModal")
  );
}
