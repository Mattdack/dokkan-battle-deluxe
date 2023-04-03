import React, {useState, useRef} from 'react'

import Auth from "../util/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_EVENT_DATA, GET_USERDATA } from "../util/queries";
import { ADD_COMMENT_TO_STAGE, ADD_REPLY_TO_COMMENT, REMOVE_REPLY_FROM_COMMENT } from "../util/mutations";

import Reply from './Reply';
import CharacterSelectionForReply from "./CharacterSelectionForReply";
import WarningRemoveCommentModal from '../modals/modals-strategy/WarningRemoveCommentModal';

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const replyIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/reply-icon.png";
const trashIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/trash-icon.png";
const cardIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/card-icon.png";

export default function Comment({ comment, characterDictionary, selectedStage }) {
  const [addReplyToComment, { error: replyAddedError, data: replyAddedData }] = useMutation(ADD_REPLY_TO_COMMENT)
  const [removeReplyFromComment, { error: replyRemoveError, data: replyRemovedData }] = useMutation(REMOVE_REPLY_FROM_COMMENT)
  
  const [openWarningRemoveComment, setOpenWarningRemoveComment] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [showUsersCards, setShowUserCards] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showCardToolTip, setShowCardToolTip] = useState(false)
  const [showReplyTollTip, setShowReplyTollTip] = useState(false)
  const [showDeleteToolTip, setShowDeleteToolTip] = useState(false)
  
  const profileData = Auth.getProfile() || [];

  function handleCommentDelete (comment) {
    setCommentToDelete(comment._id)
    setOpenWarningRemoveComment(true)
  }

  const replyFormRef = useRef(null)

  function handleReplySubmit (e, comment) {
    e.preventDefault();
    const formData = new FormData(replyFormRef.current);
    const formObject = Object.fromEntries(formData);
    for (const [key, value] of formData.entries()) {
      // convert the value of the checkbox to a boolean
      const newValue = (value === 'on' || value === 'true') ? true : value;
      formObject[key] = newValue;
    }
    console.log(profileData?.data?._id)
    console.log(comment._id)
    console.log(formObject.replyInput)
    console.log(characterSelection)

    addReplyToComment({
      variables: {
        userId: profileData?.data?._id,
        commentId: comment._id,
        reply: formObject.replyInput,
        selectedCharacters: characterSelection,
      }
    })
    .then((results) => {
      console.log(results)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const [characterSelection, setCharacterSelection] = useState([])
  function handleCommentCharacterSelection(characterId) {
    setCharacterSelection((prev) => {
      if (prev.includes(characterId)) {
        return prev.filter((id) => id !== characterId);
      } else {
        if (prev.length < 7) {
          return [...prev, characterId];
        } else {
          return [prev[1], prev[2], prev[3], prev[4], prev[5], prev[6], characterId];
        }
      }
    });
  }

  function handleShowReplyForm () {
    if (showUsersCards){
      return
    }
    setShowReplyForm(!showReplyForm)
  }

  function handleShowCharacterCards () {
    setShowUserCards(!showUsersCards)
    setShowReplyForm(true)
  }

  function handleRemoveReply (comment, reply) {
    removeReplyFromComment({
      variables:{
        userId: profileData?.data?._id,
        commentId: comment._id,
        replyId: reply._id 
      }
    })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <>
    <WarningRemoveCommentModal profileId={profileData?.data?._id} selectedStageId={selectedStage?._id} commentId={commentToDelete} open={openWarningRemoveComment} onClose={() => setOpenWarningRemoveComment(!openWarningRemoveComment)}/>
                  <div>
                      <div key={comment._id} className='w-full p-2 mb-4 border-2 border-gray-500 bg-gray-500/[.3] rounded-lg'>
                        <span className="flex justify-between">
                          <div className="flex flex-wrap">
                            <p className="pr-4">{comment.creator.username.replace(/(.+)@.+\..+/, "$1")}</p>
                            <div>|</div>
                            <p className="pl-4">{new Date(parseInt(comment.createdAt)).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</p>
                          </div>


                          <div className="flex flex-wrap">
                            <div className="relative">
                              <img src={replyIcon} 
                              onClick={() => handleShowReplyForm(!showReplyForm)} 
                              onMouseEnter={() => setShowReplyTollTip(true)}
                              onMouseLeave={() => setShowReplyTollTip(false)}
                              className='w-8 h-8 transform scale-x-[-1] hover:bg-gray-500 rounded-lg z-50 cursor-pointer relative'/>
                              <div className={`absolute bottom-[110%] left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded-lg text-center ${showReplyTollTip ? 'opacity-100 z-[1000]' : 'opacity-0 z-[0]'} transition-opacity`}>
                                  click to reply to this comment
                              </div>
                            </div>
                            
                            {comment.userSavedCharacters && 
                              <div className="relative">
                                <img
                                  src={cardIcon}
                                  onClick={() => handleShowCharacterCards()}
                                  onMouseEnter={() => setShowCardToolTip(true)}
                                  onMouseLeave={() => setShowCardToolTip(false)}
                                  className="w-8 h-8 p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 cursor-pointer relative"
                                  />
                                <div className={`absolute bottom-[110%] left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded-lg text-center ${showCardToolTip ? 'opacity-100 z-[1000]' : 'opacity-0 z-[0]'} transition-opacity`}>
                                  show {comment.creator.username.replace(/(.+)@.+\..+/, "$1")}'s characters
                                </div>
                              </div>
                            }
                            {profileData?.data?._id === comment.creator._id &&
                            <div className="relative">
                              <img src={trashIcon} 
                              onClick={() => handleCommentDelete(comment)}
                              onMouseEnter={() => setShowDeleteToolTip(true)}
                              onMouseLeave={() => setShowDeleteToolTip(false)} 
                              className="w-8 h-8 p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 cursor-pointer relative"/>
                              <div className={`absolute bottom-[110%] left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded-lg text-center ${showDeleteToolTip ? 'opacity-100 z-[1000]' : 'opacity-0 z-[0]'} transition-opacity`}>
                                delete this comment
                              </div>
                            </div>
                            }
                          </div>
                        

                        </span>

                        <p className="flex">{comment.content}</p>

                        <div className="w-full border-2 my-2"></div>
                        
                          {showUsersCards && 
                          <div>
                            <CharacterSelectionForReply characterDictionary={characterDictionary} usersSavedCharacterIds={comment.userSavedCharacters} handleCommentCharacterSelection={handleCommentCharacterSelection} characterSelection={characterSelection}/>
                            <div className="flex w-full justify-center">
                              <div className="flex flex-wrap w-fit p-2 my-2 border-2 border-black justify-center">
                                <p className="w-full text-center text-lg font-bold underline decoration-2">Characters Suggested</p>
                                  {characterSelection && characterSelection.map(characterId => 
                                  <div className={`hover:bg-amber-600`}
                                  onClick={() => handleCommentCharacterSelection(characterId)}
                                  >
                                    <CharacterCard individualCharacter={characterDictionary[characterId]}/>
                                  </div>  
                                    )}
                              </div>
                            </div>
                          </div>
                          }


                          {showReplyForm && profileData?.data?._id ?
                            <form
                            ref={replyFormRef}
                            onSubmit={(e) => handleReplySubmit(e, comment)}
                            className='flex flex-col mt-2 justify-end items-end'
                            >
                              <textarea
                                name="replyInput"
                                className="w-full p-2 border-2 border-black resize-none"
                                maxLength="500"
                                placeholder="write reply here..."
                                required
                                style={{ minHeight: "50px" }}
                              ></textarea>
                              <button type='submit' className="w-fit px-2 py-1 mt-4 border-2 border-black bg-orange-300 hover:bg-orange-400 relative z-[1000]">Submit Reply</button>
                            </form> 
                            :
                            null
                          }
          
                        {comment.replies.length > 0 && comment.replies.map(singleReply => 
                          <Reply characterDictionary={characterDictionary} reply={singleReply} comment={comment} handleRemoveReply={handleRemoveReply} profileData={profileData}/>
                        )}

                      </div>
                  </div>
    </>
  )
}

const CharacterCard = ({individualCharacter}) => {
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`Character Thumb/${individualCharacter.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`rarities-types/${individualCharacter.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`rarities-types/${individualCharacter.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`rarities-types/${individualCharacter.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);
 
  return (
    <>
        <div className='w-fit relative'>
          <AdvancedImage
            className="h-[60px] card-sm:h-[75px] w-[60px] card-sm:w-[75px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
            cldImg={characterTypeBadge}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
        </div>
    </>
  );
}