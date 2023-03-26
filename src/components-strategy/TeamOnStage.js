import React, { useState, memo, useEffect } from "react";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_ONE_TEAM_POST } from "../util/queries";
import { LIKE_TEAM_POST, REMOVE_LIKE_FROM_TEAM_POST } from "../util/mutations";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

import WarningRemoveTeamPostModal from "../modals/modals-strategy/WarningRemoveTeamPostModal";
import Auth from "../util/auth"

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const trashIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/trash-icon.png";
const editIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/edit-icon.png";
const analysisIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/analysis-icon.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
const likeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/like-icon.png";
const commentIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/comment-icon.png";
const downIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/down-icon.png";
const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";

function TeamOnStage({ team, handleSetSelectedTeam, selectedStage, selectedTeam, characterDictionary }) {
  const [getTeamPostData, { loading: teamPostLoading, data: teamPostData }] = useLazyQuery(GET_ONE_TEAM_POST, {
    variables: {
      teamId: team._id,
    },
    onCompleted: (data) => {
      if(data){
        setArrayOfLikesOnTeamPost(data.findOnePostTeam.likes)
      }
    },
  });

  const [likeTeamPost, { error: likedPostError, data: likedPostData }] = useMutation(LIKE_TEAM_POST)
  const [removeLikeFromTeamPost, { error: removeLikeOnTeamPostError, data: removeLikeOnTeamPostData }] = useMutation(REMOVE_LIKE_FROM_TEAM_POST)

  const [arrayOfLikesOnTeamPost, setArrayOfLikesOnTeamPost] = useState(team?.likes || [])

  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [showComments, setShowComments] = useState(false)


  const [teamToUse, setTeamToUse] = useState([])

  const profileId = Auth.getProfile()?.data?._id;

  function handleWarningModal (team){
    setTeamToUse(team)
    setOpenWarningModal(true)
  }

  function handleCommentDropDown (e, team){
    e.stopPropagation()
    setShowComments(!showComments)
  }

  function handleLikeTeamPost (e, teamPostId) {
    e.stopPropagation()
    likeTeamPost({
      variables:{
        userId: profileId,
        teamPostId:teamPostId
      }
    })
    .then((result) => {
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleRemoveLikeFromTeamPost (e, teamPostId){
    e.stopPropagation()
    removeLikeFromTeamPost({
      variables:{
        userId: profileId,
        teamPostId: teamPostId
      }
    })
    .then((result) => {
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getTeamPostData()
  },[likedPostData, removeLikeOnTeamPostData])

  const entireTeamObject = [team?.character1, team?.character2, team?.character3, team?.character4, team?.character5, team?.character6, team?.character7]
  const teamDeck = entireTeamObject.filter(character => character.leaderOrSubLeader !== 'subLeader')
  const subLeaderCharacter = entireTeamObject.filter(character => character.leaderOrSubLeader === 'subLeader')[0]

  console.log(team)

  return (
    <>
    <WarningRemoveTeamPostModal profileId={profileId} team={teamToUse} selectedStage={selectedStage} open={openWarningModal} onClose={() => setOpenWarningModal(false)}/>
      <div key={team._id} className='relative max-w-[400px] lg:max-w-full' onClick={() => handleSetSelectedTeam()}> 
              {/* <img src={editIcon} onClick={() => handleEditTeamInfo(team)} className="w-10 h-fit p-1 mt-2 mr-2 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-0 right-0 cursor-pointer"/> */}
              {/* <img src={analysisIcon} className={`${!team.info.leader || window.innerHeight<1080 ? 'hidden' : ''}`}/> */}
            <div className={`font-header flex w-full h-fit pt-4 pb-2 border-x-4 border-t-4 border-black text-xl card-sm:text-2xl underline underline-offset-8 decoration-solid decoration-2 rounded-t-lg justify-center items-center text-center ${selectedTeam && selectedTeam._id === team._id ? 'bg-orange-400' : 'bg-orange-200'} relative`}>
              {profileId === team.creator._id ? 
                <img src={trashIcon} onClick={() => handleWarningModal(team)} className="w-8 card-sm:w-10 h-fit p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-1 left-1 cursor-pointer"/>
                :
                null 
              }
              {/* {profileId === team.creator._id ? 
                <img src={editIcon} onClick={() => handleWarningModal(team)} className="w-8 card-sm:w-10 h-fit p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-1 right-1 cursor-pointer"/>
                :
                null 
              } */}
              {team.name}
            </div>
            
            <div className={`flex flex-wrap pt-2 pb-10 px-6 ${showComments ? '' : 'mb-2'} border-x-4 border-b-4 border-black ${showComments ? '' : 'rounded-b-lg'} justify-around ${selectedTeam && selectedTeam._id === team._id ? 'bg-orange-400' : 'bg-orange-200'} relative`}>
              
              <div className="flex w-full justify-around items-stretch">
                <div className="w-full grid grid-cols-2 justify-items-center">
                  <p className="col-span-2 w-full font-header text-xl card-sm:text-2xl font-bold border-black">Team</p>
                  {entireTeamObject &&
                    teamDeck.sort((a, b) => {
                        if (a.leaderOrSubLeader === 'leader' && b.leaderOrSubLeader !== 'leader') {
                          return -1; // a should come before b
                        } else if (a.leaderOrSubLeader !== 'leader' && b.leaderOrSubLeader === 'leader') {
                          return 1; // b should come before a
                        } else if (a.leaderOrSubLeader === 'subLeader' && b.leaderOrSubLeader !== 'subLeader') {
                          return 1; // b should come before a
                        } else if (a.leaderOrSubLeader !== 'subLeader' && b.leaderOrSubLeader === 'subLeader') {
                          return -1; // a should come before b
                        } else {
                          return 0; // no change in order
                        }
                      }).map((character) => (
                        <div>
                        <CharacterCard
                          individualCharacter={characterDictionary[character.characterId]}
                          EZA={character.EZA}
                          leaderOrSubLeader={character.leaderOrSubLeader}
                        />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between">
                  <div className="">
                    <p className="font-header text-xl card-sm:text-2xl font-bold border-black">Friend</p>
                    <div>
                      <CharacterCard 
                      individualCharacter={characterDictionary[subLeaderCharacter.characterId]}
                      EZA={subLeaderCharacter.EZA}
                      leaderOrSubLeader={subLeaderCharacter.leaderOrSubLeader}
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="font-header text-xl card-sm:text-2xl font-bold border-black">items</p>
                      {(team.items.length === 0 || team.items[0].id === 0) &&
                      <div className="flex flex-wrap flex-row p-2 justify-center items-center">
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                      </div>
                      }
                      {(team.items.length === 1) &&
                      <div className="flex flex-wrap flex-row p-2 justify-center items-center">
                        <ItemCard item={team.items[0]} key={team.items[0].id}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                      </div>
                      }
                      {(team.items.length === 2) &&
                      <div className="flex flex-wrap flex-row p-2 justify-center items-center">
                        <ItemCard item={team.items[0]} key={team.items[0].id}/>
                        <ItemCard item={team.items[1]} key={team.items[1].id}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                      </div>
                      }
                      {(team.items.length === 3) &&
                      <div className="flex flex-wrap flex-row p-2 justify-center items-center">
                        <ItemCard item={team.items[0]} key={team.items[0].id}/>
                        <ItemCard item={team.items[1]} key={team.items[1].id}/>
                        <ItemCard item={team.items[2]} key={team.items[2].id}/>
                        <ItemCard item={{id:0, type:'bronze'}}/>
                      </div>
                      }
                      {(team.items.length === 4) &&
                      <div className="flex flex-wrap flex-row p-2 justify-center items-center">
                      {team.items && team.items.map((item) => (
                        <ItemCard item={item} key={item.id}/>
                      ))}
                    </div>
                      }
                  </div>
                </div>
              </div>
                
              {team.mission === 'No Mission' &&
              <div className="flex w-full p-2">
                <p className="font-header text-xl font-bold border-black">Mission:</p>
                <p className="font-bold max-w-full pl-4 text-xl truncate text-left justify-center">{team.mission}</p>
              </div>
              }

                <div className={`${arrayOfLikesOnTeamPost.includes(profileId) ? 'bg-blue-500 hover:bg-blue-700': `${profileId ? 'hover:bg-gray-500/[.75]' : ''}`} flex h-8 p-1 justify-center items-center absolute bottom-1 right-1 cursor-pointer transition ease-in-out rounded-lg z-50`}>
                  <p className="text-xl font-bold">{arrayOfLikesOnTeamPost && arrayOfLikesOnTeamPost.length}</p>
                  <img 
                    className='w-8'
                    src={likeIcon} 
                    onClick={Auth.loggedIn() ? (
                      arrayOfLikesOnTeamPost.includes(profileId) 
                        ? (e) => handleRemoveLikeFromTeamPost(e, team._id) 
                        : (e) => handleLikeTeamPost(e, team._id)
                    ) : null}
                  />
                </div>

              {/* <div className="flex h-8 p-1 justify-center items-center absolute bottom-1 left-1 cursor-pointer hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50">
                <p className="text-xl font-bold">{team.comments.length}</p>
                <img src={commentIcon} onClick={(e) => handleCommentDropDown(e, team)} className="w-8"/>
              </div> */}
              
              <p className="max-w-[80%] p-2 card-sm:text-xl font-bold text-center absolute bottom-0 left-0 truncate">creator: {team.creator.username}</p>

            </div>
            {/* {showComments ? <CommentSection comments={team.comments}/> : null } */}
      </div>
    </>
  );
};

// function CommentSection({ comments }) {
//   console.log(comments)
//   return (
//     <div className="w-full h-[200px] max-h-[200px] border-x-4 border-b-4 border-black z-50 bg-orange-100 rounded-b-lg p-4 shadow-md">
//       <p className="font-header">Comments:</p>
//       {comments && comments.map((comment) => 
//         comment
//       )}
//     </div>
//   );
// }

const CharacterCard = ({individualCharacter, EZA, leaderOrSubLeader}) => {
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
        <div className='flex w-fit justify-center items-center relative'>
          <AdvancedImage
            className="w-[80px] card-sm:w-[100px] bottom-[5%] bg-no-repeat relative z-40"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          {leaderOrSubLeader === 'leader' ? <img src={leaderIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
          {leaderOrSubLeader === 'subLeader' ? <img src={friendIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
          {EZA ? <img src={ezaIcon} className='w-[30%] bottom-[5%] right-[0%] absolute z-50'/> : null}
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[81%] absolute top-[13%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            cldImg={characterTypeBadge}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
        </div>
    </>
  );
}

const ItemCard = ({item}) => {
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let itemThumb = new CloudinaryImage(`Items/${item.id}`, cloudConfig, urlConfig);
  let itemBackground = item.type ? new CloudinaryImage(`Items/background-${item.type.toLowerCase()}`, cloudConfig, urlConfig) : null;
  return (
        <div className='w-fit relative m-1'>
          <AdvancedImage
            className="h-[40px] card-sm:h-[50px] w-[40px] card-sm:w-[50px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
            cldImg={itemThumb}
            alt={item.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          {itemBackground && (
            <AdvancedImage
              className="w-[100%] card-sm:w-[100%] absolute top-[0%] card-sm:top-[0%] right-[0%] card-sm:right-[0%] z-0"
              cldImg={itemBackground}
              plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          )}
        </div>
  );
}

export default memo(TeamOnStage);
