import React, { useState, useEffect } from "react";
import Auth from "../util/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_EVENT_DATA, GET_USERDATA } from "../util/queries";
import { LIKE_TEAM_POST, REMOVE_LIKE_FROM_TEAM_POST } from "../util/mutations";

import EventTab from "./EventTab";
import StageTab from "./StageTab";
import TeamOnStage from "./TeamOnStage"
import AllTeamInfo from "./AllTeamInfo"

import SelectTeamToStageModal from "../modals/modals-strategy/SelectTeamToStageModal"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";

function AllStrategy( { allCharactersLoading, characterDictionary, allItems, allSupportMemories} ) {
  // const [allEvents, setAllEvents] = useState([])
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

  const { loading: allEventsLoading, data: allEventsData } = useQuery(GET_EVENT_DATA);
  const allEvents = allEventsData?.allEventsStagesTeams || [];

  const profileData = Auth.getProfile() || [];
  const { loading: isUserDataLoading, data: userData } = useQuery(GET_USERDATA,
    {
      variables: {
        profileId: profileData?.data?._id || "",
      },
    }
  );
  const userDecks = userData?.findOneUser?.decks

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [filterDecksBySavedCharacters, setFilterDecksBySavedCharacters] = useState(false)

  const [openSelectTeamToStage, setOpenSelectTeamToStage] = useState(false)

  function handleSetSelectedEvent (event) {
    setSelectedEvent(null)
    setSelectedStage(null)
    setSelectedTeam(null)
    setSelectedEvent(event)
  }

  function handleSetSelectedStage (stage) {
    setSelectedTeam(null)
    setSelectedStage(stage)
    scrollToAllTeamInStage()
  }

  function handleSetSelectedTeam (team) {
    setSelectedTeam(team)
    scrollToTeamInfo()
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
  const scrollToTeamInfo = () => {
    const middleColumn = document.getElementById("selectedTeam");
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

  return (
    <div key={'AllStrategy'} className="disable-zoom overflow-hidden flex flex-row lg:flex-wrap bg-slate-700">
      <SelectTeamToStageModal userDecks={userDecks} userData={userData?.findOneUser} stageData={selectedStage} characterDictionary={characterDictionary} allItems={allItems} allSupportMemories={allSupportMemories} open={openSelectTeamToStage} onClose={() => setOpenSelectTeamToStage(!openSelectTeamToStage)} key={'selectTeamToStageModal'}/>

      {/* //left column styling */}
      <div key={'leftColumn'} id="stageSelection" className="flex flex-col h-[100vh] lg:h-[90vh] w-screen lg:w-[30%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 border-slate-900">
        <div className="h-[100vh] card-sm:h-[90vh] w-screen lg:w-full border-4 border-black rounded-lg">
          <div className="h-1/2 border-b-4 border-black">
            <div className="flex flex-col h-full items-center w-full overflow-y-auto">
              <p className="font-header flex w-full h-fit justify-center items-center text-3xl sticky top-0 border-x-4 border-b-4 border-black bg-orange-200 z-[998]">Events</p>
              {allCharactersLoading ? <div className="flex w-[90%] bg-orange-200 p-2 m-2 text-xl text-center justify-center items-center border-4 border-black">loading...</div>
              :
              allEvents && sortedEvents.map(event => 
                <div onClick={() => handleSetSelectedEvent(event)} className={`m-1 hover:bg-slate-900/[.4] ${selectedEvent?._id === event._id ? 'bg-slate-900/[.75] hover:bg-slate-900/[.9]' : ''}`}>
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
      <div key={'middleColumn'} id="stageAllTeams" className="h-[100vh] lg:h-[90vh] w-screen lg:w-[32.5%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900">
        <div className="lg:hidden h-[5vh] w-screen lg:w-[37.5%] pr-2 flex justify-around">
          <button
            className="flex font-header text-lg card-sm:text-2xl h-[5vh] w-full bg-orange-200 border-4 border-black justify-center text-center items-center rounded-lg"
            onClick={() => scrollToStageSelection()}
          >
            Event & Stage Selection
          </button>
        </div>

        <div className="flex flex-col w-full h-full pb-10 border-4 border-black items-center rounded-lg overflow-y-auto">
          <div className="flex flex-col justify-center items-center w-full p-4">
            <div className="flex flex-row pb-2 items-center">
              <p className="font-header mr-4 text-lg card-sm:text-3xl">Event:</p>
              {selectedEvent ? <div className="flex w-full p-2 justify-center items-center"><EventTab className='' key={selectedEvent.name} event={selectedEvent}/></div> : null}
            </div>
            <div className="flex justify-center items-center w-[95%] border-2 border-black"/>
            <div className="flex flex-row items-center">
              <p className="font-header mr-4 text-lg card-sm:text-3xl">Stage:</p>
              {selectedStage ? <div className="flex w-full p-2 justify-center items-center"><StageTab key={selectedStage.name} stageName={selectedStage.name}/></div> : null} 
            </div>
          </div>

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
              <button className="flex flex-wrap w-full justify-around ">
                <div className={
                  filterDecksBySavedCharacters && userData?.findOneUser?.savedCharacters ?
                    userData.findOneUser.savedCharacters.every(c => team.teamArray.includes(c)) ? '' : 'grayscale'
                    : ''
                }>
                  <TeamOnStage key={team._id} team={team} handleSetSelectedTeam={() => handleSetSelectedTeam(team)} selectedStage={selectedStage} selectedTeam={selectedTeam} characterDictionary={characterDictionary} />
                </div>
              </button>
          ).reverse()}


          {selectedStage && selectedStage.teams.length === 0 && 
            <div className="flex w-[90%] p-4 text-lg font-bold border-2 border-black bg-orange-200 justify-center items-center rounded-lg">No teams have been posted for this stage yet. Have you completed this stage? Feel free to make a team and post it here!</div>
          }
        </div>
      </div>

      {/* //right column styling */}
      <div key={'rightColumn'} id="selectedTeam" className="h-[100vh] lg:h-[90vh] w-screen lg:w-[37.5%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900" >
        <div className="lg:hidden h-[5vh] w-screen lg:w-full pr-2 flex justify-around">
          <button
            className="font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-4 border-black justify-center text-center items-center rounded-l-lg"
            onClick={() => scrollToStageSelection()}
          >
            Stage Selection
          </button>
          <button
            className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-4 border-black justify-center text-center items-center rounded-r-lg"
            onClick={() => scrollToAllTeamInStage()}
          >
            Team Selection
          </button>
        </div>

        <div className="h-[95vh] border-4 border-black rounded-lg overflow-y-auto">
            {selectedTeam ? <AllTeamInfo key={"selectedTeam" + selectedTeam._id} team={selectedTeam} characterDictionary={characterDictionary}/> : null}
        </div>
        
      </div>

    </div>
)}

export default AllStrategy;
