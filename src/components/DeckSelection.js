import React, { useState, useContext } from "react";
import Auth from "../util/auth";
import CharacterCard from "../cards/CharacterCard";
import MakeTeamForm from "../modals/MakeTeamForm"
import EditTeamForm from "../modals/EditTeamForm"
import ErrorModal from "../modals/ErrorModal"
import WarningModal from "../modals/WarningModal";
import TeamAnalysis from "../modals/TeamAnalysis"

import { UserContext } from "../App";

import { useMutation } from "@apollo/client";
import { RENAME_DECK, ADD_TEAM_TO_DECK } from "../util/mutations"

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const trashIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/trash-icon.png";
const editIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/edit-icon.png";
const analysisIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/analysis-icon.png";
const teamToWebIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-team-to-web.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const subLeaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/subleader-icon.png";


export default function DeckSelection({ characterDictionary, webOfTeam, userDeckData, selectedDeck, addToWebOfTeam, removeFromWebOfTeam }) {
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openTeamAnalysis, setOpenTeamAnalysis] = useState(false)
  const [openMakeTeamForm, setOpenMakeTeamForm] = useState(false)
  const [openEditTeamForm, setOpenEditTeamForm] = useState(false)
  
  const [teamUsedInMakeTeamForm, setTeamUsedInMakeTeamForm] = useState([])
  const [teamUsedInForm, setTeamUsedInForm] = useState([])
  const [teamUsedInAnalysis, setTeamUsedInAnalysis] = useState([])

  const { grayCharactersInSelectedDeck, setGrayCharactersInSelectedDeck } = useContext(UserContext);
  
  const [newDeckName, setNewDeckName] = useState("");

  const [renameDeck, { error: renameDeckError, data: updatedRenameDeck }] = useMutation(RENAME_DECK);

  //getting the profileId number for future mutations
  const profileId = Auth.getProfile()?.data?._id;
  const selectedDeckObj = userDeckData.find(deck => deck._id === selectedDeck);
  const allTeams = selectedDeckObj?.teams
  
  //this runs on the save button click
  async function handleRenameDeck (e) {
    e.preventDefault()
    await renameDeck({
      variables:{
        profileId: profileId,
        deckId: selectedDeckObj?._id,
        newDeckName: newDeckName
      }
    }).catch((error) => {
      setErrorMessage(error.message);
      setOpenErrorModal(true);
    })
  }
  
  async function handleAddTeamToDeck() {
    const cleanWebOfTeam = webOfTeam.map((character) => {
      const { __typename, ...cleanCharacter } = character;
      return cleanCharacter;
    });

    setTeamUsedInMakeTeamForm(cleanWebOfTeam)
    setOpenMakeTeamForm(true)
  }

  function handleTeamAnalytics (team){
    setTeamUsedInAnalysis(team)
    setOpenTeamAnalysis(true)
  }

  function handleMakeTeamForm (team){
    setTeamUsedInForm(team)    
    setOpenEditTeamForm(true)
  }

  function handleEditTeamInfo (team){
    setTeamUsedInForm(team)    
    setOpenEditTeamForm(true)
  }

  function handleWarningModal (team){
    setTeamUsedInForm(team)
    setOpenWarningModal(true)
  }

  function handleAddTeamToWeb (team){
    for (let i = 0; i < webOfTeam.length; i++) {
      removeFromWebOfTeam(webOfTeam[i])      
    }
    team.characters.map(character => {
      addToWebOfTeam(character)
    })
  }

  
  return (
    <>
    <TeamAnalysis team={teamUsedInAnalysis} open={openTeamAnalysis} onClose={() => setOpenTeamAnalysis(false)}/>
    <MakeTeamForm team={teamUsedInMakeTeamForm} selectedDeck={selectedDeck} open={openMakeTeamForm} onClose={() => setOpenMakeTeamForm(false)}/>
    <EditTeamForm team={teamUsedInForm} selectedDeck={selectedDeck} open={openEditTeamForm} onClose={() => setOpenEditTeamForm(false)}/>
    <WarningModal profileId={profileId} selectedDeck={selectedDeckObj} team={teamUsedInForm} open={openWarningModal} onClose={() => setOpenWarningModal(false)}/>
    <ErrorModal errorMessage={errorMessage} open={openErrorModal} onClose={() => setOpenErrorModal(false)} />


    <div className="mb-6">

      <div className="flex flex-wrap px-2 justify-center items-center card-sm:justify-between">
        <form className='flex flew-wrap mt-2 w-full' onSubmit={handleRenameDeck}>
          {/* input field for new deck name */}
          <input 
            type="text" 
            id="newDeckName" 
            name="newDeckName" 
            value={newDeckName} 
            onChange={(e) => setNewDeckName(e.target.value)} 
            className="w-full h-full border-2 border-gray-400 p-2 rounded-lg" 
            placeholder="New Deck Name" 
            maxLength="50"
            required 
          />
          <button type="submit" className="-ml-11 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-lg">
          🗸
          </button>
        </form>
        <button disabled={webOfTeam.length < 6 || webOfTeam.length >= 8} onClick={() => handleAddTeamToDeck()} className="disabled:bg-gray-500 flex justify-center items-center w-full h-12 my-2 border-4 border-black text-md lg:text-base font-bold rounded-full bg-orange-200 hover:bg-orange-400 transition ease-in-out">
          <img src={addIcon} className="w-8 mr-2"/>ADD TEAM TO DECK
        </button>
        {webOfTeam.length < 6 && <p className="w-full border border-black text-sm lg:text-base text-center rounded-lg bg-orange-200/[.75]">*team must have 6 to 7 characters in it to add it to a deck</p>}
      </div>

      <div className="flex flex-wrap w-full p-2 justify-around" key={allTeams}>
        {allTeams ? allTeams.map(team => (
          <div key={team._id} className='flex flex-col w-full max-w-[400px] lg:max-w-full pb-12 px-4 mb-2 border-4 border-black rounded-lg justify-around bg-orange-200 hover:bg-orange-400 relative'> 
              <img src={editIcon} onClick={() => handleEditTeamInfo(team)} className="w-8 card-sm:w-10 h-8 card-sm:h-10 p-1 mt-2 mr-2 text-center hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-0 right-0 cursor-pointer"/>
              <img src={trashIcon} onClick={() => handleWarningModal(team)} className="w-8 card-sm:w-10 h-8 card-sm:h-10 p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute bottom-0 right-0 cursor-pointer"/>
              <img src={teamToWebIcon} title='clear current team web and add this team to web' onClick={() => handleAddTeamToWeb(team)} className="w-8 card-sm:w-10 h-8 card-sm:h-10 p-1 mb-1 ml-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute bottom-0 left-0 cursor-pointer"/>
              {/* <button disabled={!team.info.leader || window.innerHeight<1080} onClick={() => handleTeamAnalytics(team)} className="disabled:opacity-100 w-10 h-fit p-1 mt-2 ml-2 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-0 left-0">
                <img src={analysisIcon} className={`${!team.info.leader || window.innerHeight<1080 ? 'hidden' : ''}`}/>
              </button> */}
            <div className="font-header flex w-full h-fit py-4 border-black text-2xl card-sm:text-2xl  underline underline-offset-8 decoration-solid decoration-2 rounded-t-lg justify-center items-center text-center relative">
              {team.name}
            </div>
            {/* start at flex row, 850 to 1285 pxls we go to stack, then 1285 after we go back to row*/}
            <div className="flex lg:flex-col xl:flex-row justify-around">

              <div className="grid grid-cols-2 gap-y-6 justify-items-center">
                <p className="col-span-2 font-header w-full text-xl card-sm:text-xl font-[100] border-black text-center">Team</p>
                <div>
                  <CharacterCard individualCharacter={characterDictionary[team.info.leader] || 0} leaderOrSubLeader={'leader'} mobileSize={'80px'} desktopSize={'80px'} />
                </div> 
                  {team.characters.map((character) => 
                    character.id !== team.info.leader && character.id !== team.info.subLeader ?
                    <div>
                    <CharacterCard key={'TeamCard'+character.id} individualCharacter={characterDictionary[character.id]} leaderOrSubLeader={''} mobileSize={'80px'} desktopSize={'80px'}/>
                    </div>
                    :
                    null
                  )}
              </div>

              <div className="flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Sub/Friend</p>
                    <div>
                    <CharacterCard individualCharacter={characterDictionary[team.info.subLeader] || 0} leaderOrSubLeader={'sub'} mobileSize={'80px'} desktopSize={'80px'}/>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Rotation 1</p>
                    <div className="flex">
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation1[0]] || 0} mobileSize={'80px'} desktopSize={'80px'}/>
                      </div>
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation1[1]] || 0} mobileSize={'80px'} desktopSize={'80px'}/>
                      </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Rotation 2</p>
                    <div className="flex">
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation2[0]] || 0} mobileSize={'80px'} desktopSize={'80px'}/>
                      </div>                                            
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation2[1]] || 0} mobileSize={'80px'} desktopSize={'80px'}/>
                      </div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        )).reverse() : null }
      </div>
    </div>
    </>
  );
}