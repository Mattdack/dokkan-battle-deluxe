import React, { useState, useEffect, useRef } from "react";
import Auth from "../util/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_EVENT_DATA, GET_ALL_EVENTS, GET_USERDATA } from "../util/queries";
import { ADD_COMMENT_TO_STAGE, ADD_REPLY_TO_COMMENT, REMOVE_REPLY_FROM_COMMENT } from "../util/mutations";

import EventTab from "./EventTab";
import StageTab from "./StageTab";
import TeamOnStage from "./TeamOnStage"
import AllTeamInfo from "../modals/modals-strategy/AllTeamInfoModal"

import SelectTeamToStageModal from "../modals/modals-strategy/SelectTeamToStageModal";
import WarningRemoveCommentModal from "../modals/modals-strategy/WarningRemoveCommentModal";
import Comment from "./Comment";
import CharacterSelectionForReply from "./CharacterSelectionForReply";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const commentIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/comment-icon.png";

function AllStrategy( { allCharactersLoading, characterDictionary, allItems, allSupportMemories} ) {
  // const [allEvents, setAllEvents] = useState([])
  const [addCommentToStage, { error: commentAddedError, data: commentAddedData }] = useMutation(ADD_COMMENT_TO_STAGE)

  const [queryAllEventsAgain, setQueryAllEventsAgain] = useState(false)

  // const [getEventData, { loading: allEventsLoading, data: allEventsData }] = useLazyQuery(GET_EVENT_DATA, {
  //   onCompleted: (data) => {
  //     if(data){
  //       console.log('event query run')
  //       setAllEvents(data.allEventsStagesTeams)
  //     }
  //   },
  // });

  // useEffect(() => {
  //   console.log('loading the events, stages, and teams')
  //   getEventData()
  // },[allCharactersLoading])

  const { loading: allEventsLoading, data: allEventsData } = useQuery(GET_ALL_EVENTS)
  const { loading: allEventsLoadingOld, data: allEventsDataOld } = useQuery(GET_EVENT_DATA)
  const allEvents = allEventsData?.findAllEvents || [];

  const profileData = Auth.getProfile() || [];
  const { loading: isUserDataLoading, data: userData } = useQuery(GET_USERDATA,
    {
      variables: {
        profileId: profileData?.data?._id || "",
      },
    }
  );
  const userSavedCharacters = userData?.findOneUser?.savedCharacters
  const userDecks = userData?.findOneUser?.decks

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [filterDecksBySavedCharacters, setFilterDecksBySavedCharacters] = useState(false)

  const [openSelectTeamToStage, setOpenSelectTeamToStage] = useState(false)
  const [openAllTeamInfoModal, setOpenAllTeamInfoModal] = useState(false)

  function handleSetSelectedEvent (event) {
    if (event === selectedEvent){
      return
    }
    setSelectedEvent(null)
    setSelectedStage(null)
    setSelectedTeam(null)
    setSelectedEvent(event)
    setShowComments(false)
    // setShowUserCards(false)
    // setShowReplyForm(false)
  }

  function handleSetSelectedStage (stage) {
    setSelectedTeam(null)
    setSelectedStage(stage)
    scrollToAllTeamInStage()
  }

  function handleSetSelectedTeam (team) {
    setSelectedTeam(team)
    setOpenAllTeamInfoModal(true)
    // scrollToTeamInfo()
  }

  function handleOpenSelectTeamToStageModal(){
    setOpenSelectTeamToStage(true)
  }

  function handleFilterBySavedCharacters (){
    setFilterDecksBySavedCharacters(!filterDecksBySavedCharacters)
  }
  

  const scrollToStageSelection = () => {
    const middleColumn = document.getElementById("stageSelection");
    middleColumn.scrollIntoView({ top: 0, left: 0 });
  };
  const scrollToAllTeamInStage = () => {
    const middleColumn = document.getElementById("stageAllTeams");
    middleColumn.scrollIntoView({ top: 0, left: 0 });
  };

  //to sort the events how I wanted
  const sortedEvents = allEvents.slice().sort((a, b) => {
    const nameOrder = [
      "Ultimate Red Zone Red Ribbon Army Edition",
      "Ultimate Red Zone SDBH Edition",
      "Ultimate Red Zone Wicked Bloodline Edition",
      "Ultimate Red Zone Movie Edition",
      "Ultimate Red Zone GT Edition",
      "Fearsome Activation! Cell Max",
      "Fighting Spirit of the Saiyans and Pride of the Wicked Bloodline",
      "Collection of Epic Battles",
      "Gods of Destruction Assemble",
      "Fighting Legend: Vegeta",
      "Fighting Legend: Goku",
      "Fighting Legend: Goku GT Edition",
      "Extreme Super Battle Road",
      "Super Battle Road",
    ]
    const nameA = nameOrder.indexOf(a.name);
    const nameB = nameOrder.indexOf(b.name);
    return nameA - nameB;
  });

  const [showComments, setShowComments] = useState(false)
  
  function handleCommentDropDown (e, team){
    e.stopPropagation()
    setShowComments(!showComments)
  }

  const commentFormRef = useRef(null)

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(commentFormRef.current);
    const formObject = Object.fromEntries(formData);
    for (const [key, value] of formData.entries()) {
      // convert the value of the checkbox to a boolean
      const newValue = (value === 'on' || value === 'true') ? true : value;
      formObject[key] = newValue;
    }
    let userSavedCharactersInput = null
    if (formObject.addSavedCharacter){
      userSavedCharactersInput = userSavedCharacters
    }
    addCommentToStage({
      variables:{
        userId: profileData?.data?._id,
        stageId: selectedStage._id,
        comment: formObject.commentInput,
        userSavedCharacters: userSavedCharactersInput
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
    <div key={'AllStrategy'} className="disable-zoom overflow-hidden flex flex-row lg:flex-wrap bg-slate-700">
      <SelectTeamToStageModal userDecks={userDecks} userData={userData?.findOneUser} stageData={selectedStage} characterDictionary={characterDictionary} allItems={allItems} allSupportMemories={allSupportMemories} open={openSelectTeamToStage} onClose={() => setOpenSelectTeamToStage(!openSelectTeamToStage)} key={'selectTeamToStageModal'}/>
      <AllTeamInfo key={"selectedTeam" + selectedTeam?._id} team={selectedTeam} characterDictionary={characterDictionary} open={openAllTeamInfoModal} onClose={() => setOpenAllTeamInfoModal(false)}/>

      <div className="w-[10%] bg-slate-900"></div>


      {/* //left column styling */}
      <div key={'leftColumn'} id="stageSelection" className="flex flex-col h-[100vh] lg:h-[90vh] w-screen lg:w-[30%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 border-slate-900">
        <div className="h-[100vh] card-sm:h-[90vh] w-screen lg:w-full border-4 border-black rounded-lg">
          <div className="h-1/2 border-b-4 border-black">
            <div className="flex flex-col h-full items-center w-full overflow-y-auto">
              <p className="font-header flex w-full h-fit justify-center items-center text-3xl sticky top-0 border-x-4 border-b-4 border-black bg-orange-200 z-[998]">Events</p>
              {allCharactersLoading ? <div className="flex w-[90%] bg-orange-200 p-2 m-2 text-xl text-center justify-center items-center border-4 border-black">loading...</div>
              :
              allEvents && sortedEvents.map(event => 
                <div onClick={() => handleSetSelectedEvent(event)} className={`p-2 m-1 hover:bg-slate-900/[.4] ${selectedEvent?._id === event._id ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}`}>
                  <EventTab key={event.name} event={event}/>
                </div>
              ).reverse()}
            </div>
          </div>
          
          <div className="h-1/2">
            <div className="flex h-full flex-wrap mb-1 pb-4 justify-around overflow-y-auto">
              <p className="font-header flex w-full h-fit justify-center items-center text-3xl sticky top-0 border-x-4 border-b-4 border-black bg-orange-200 z-[998]">Stages</p>
              {selectedEvent && selectedEvent.stages.map((stage) =>
              <div onClick={() => handleSetSelectedStage(stage)} className={`my-2 mx-4 hover:bg-slate-900/[.4] ${selectedStage?._id === stage._id ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}`}>
                <StageTab key={stage.name} stageName={stage.name}/>
              </div>
              )}
            </div>
          </div>
        </div>

      </div>

        
      {/* //middle column styling */}
      <div key={'middleColumn'} id="stageAllTeams" className="h-[100vh] lg:h-[90vh] w-screen lg:w-[50%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900">
        <div className="lg:hidden h-[5vh] w-screen lg:w-[37.5%] pr-2 flex justify-around">
          <button
            className="flex font-header text-lg card-sm:text-2xl h-[5vh] w-full bg-orange-200 border-4 border-black justify-center text-center items-center rounded-lg"
            onClick={() => scrollToStageSelection()}
          >
            Event & Stage Selection
          </button>
        </div>

        <div className="flex flex-col w-full h-full pb-10 border-4 border-black items-center rounded-lg overflow-y-auto">
          <div className={`flex flex-row w-full p-4 pb-10 bg-orange-200 ${showComments ? 'border-b-2' : 'border-b-4 rounded-b-lg '} border-black justify-around relative`}>
            <div className="flex flex-row pr-2 w-1/2 pb-2 items-center">
              <p className="font-header mr-4 text-lg card-sm:text-xl font-light">Event</p>
              {selectedEvent ? <div className="flex w-full justify-center items-center"><EventTab key={selectedEvent.name} event={selectedEvent}/></div> : null}
            </div>

            <div className="flex justify-center items-center h-[95%] border-2 border-black"/>

            <div className="flex flex-row pl-2 max-w-[50%] items-center">
              <p className="font-header mr-4 text-lg card-sm:text-xl font-light">Stage</p>
              {selectedStage ? <div className="flex w-full p-4 justify-center items-center"><StageTab key={selectedStage.name} stageName={selectedStage.name}/></div> : null} 
            </div>
            {selectedStage &&
            <div className="flex h-8 p-1 justify-center items-center absolute bottom-1 right-1 cursor-pointer hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50">
              <span onClick={(e) => handleCommentDropDown(e, selectedStage)} className="flex justify-center intems-center text-center"><p className="font-header text-lg font-light pr-2">{showComments ? 'Hide Comments' : 'Show Comments'}</p><img src={commentIcon} className="w-8"/></span>
            </div>
            }
          </div>
            {showComments &&
                <div className="w-full min-h-[600px] max-h-[600px] border-b-4 border-black z-50 bg-orange-100 rounded-b-lg p-4 shadow-md black-scrollbar overflow-y-auto">
                <p className="flex w-full pb-4 font-header justify-center items-center text-xl text-center underline decoration-2 underline-offset-8">Comments</p>
                {profileData?.data?._id ?
                  <form
                  ref={commentFormRef}
                  onSubmit={(e) => handleCommentSubmit(e)}
                  className="flex flex-col mt-2 justify-end items-end"
                  >
                    <textarea
                      name="commentInput"
                      className="w-full p-2 border-2 border-black resize-none"
                      maxLength="500"
                      placeholder="write comment here..."
                      required
                      style={{ minHeight: "50px" }}
                    ></textarea>
                    <span className="flex w-full my-2 justify-between">
                      <label>
                        <input 
                        name='addSavedCharacter'
                        type="checkbox"
                        defaultValue={true}
                        className='mr-2'
                        ></input>
                        include saved characters to post
                      </label>
                      <button type='submit' className="px-2 py-1 ml-2 border-2 border-black bg-orange-300 hover:bg-orange-400 z-[1000] relative">Submit Comment</button>
                    </span>
                  </form> 
                  :
                  null
                }
                {selectedStage && selectedStage.comments && selectedStage.comments.length > 0 && 
                  selectedStage.comments
                    .slice()
                    .sort((a, b) => a.createdAt - b.createdAt)  
                    .map(singleComment => 
                      <Comment comment={singleComment} characterDictionary={characterDictionary} selectedStage={selectedStage}/>)
                }
              </div>
            }

          {Auth.loggedIn() ? (
            selectedStage &&
              <> 
                {/* TODO: Allow team to be filtered by characters they have saved TODO: */}
                {/* <div className="flex mb-2 justify-center items-center">
                    <h2 className="pr-3 card-sm:p-2 text-sm card-sm:text-base font-bold">
                      Filter Teams By Saved Characters
                    </h2>
                    <div className="flex items-center">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={filterDecksBySavedCharacters}
                          readOnly
                        />
                        <div
                          onClick={() => {handleFilterBySavedCharacters()}}
                          className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[21%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                        ></div>
                        <span className="ml-2 text-sm card-sm:text-base font-bold">
                          ON
                        </span>
                      </label>
                    </div>
                </div> */}
                <button onClick={() => handleOpenSelectTeamToStageModal(selectedTeam)} className="disabled:bg-gray-500 flex justify-center items-center w-[90%] h-fit p-2 my-2 border-4 border-black text-md card-sm:text-lg font-bold rounded-full bg-orange-200 hover:bg-orange-400 transition ease-in-out">
                  <img src={addIcon} className="w-6 card-sm:w-8 mr-2"/>ADD TEAM TO STAGE
                </button>
              </>
            )
            :
            (
            <div className="flex justify-center items-center text-center w-[90%] h-fit px-4 py-2 my-2 border-4 border-black text-md card-sm:text-lg font-bold rounded-full bg-orange-200">Please Log In To Add A Team To This Stage</div>
            )
          }

          {selectedStage && selectedStage.teams.map((team) =>  
              <button key={team._id} className="flex flex-wrap w-full justify-around ">
                <div className={
                  filterDecksBySavedCharacters && userData?.findOneUser?.savedCharacters ?
                    userData.findOneUser.savedCharacters.every(c => team.teamArray.includes(c)) ? '' : 'grayscale'
                    : ''
                }>
                  <TeamOnStage team={team} handleSetSelectedTeam={() => handleSetSelectedTeam(team)} selectedStage={selectedStage} selectedTeam={selectedTeam} characterDictionary={characterDictionary} />
                </div>
              </button>
          ).reverse()}


          {selectedStage && selectedStage.teams.length === 0 && 
            <div className="flex w-[90%] p-4 text-lg font-bold border-2 border-black bg-orange-200 justify-center items-center rounded-lg">No teams have been posted for this stage yet. Have you completed this stage? Feel free to make a team and post it here!</div>
          }
        </div>
      </div>

      <div className="w-[10%] bg-slate-900"></div>
    </div>
)}

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

export default AllStrategy;
