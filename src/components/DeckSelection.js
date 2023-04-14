import React, { useState } from "react";
import Auth from "../util/auth";
import MakeTeamForm from "../modals/MakeTeamForm"
import EditTeamForm from "../modals/EditTeamForm"
import ErrorModal from "../modals/ErrorModal"
import WarningModal from "../modals/WarningModal";
import TeamAnalysis from "../modals/TeamAnalysis"

import { useMutation } from "@apollo/client";
import { RENAME_DECK, ADD_TEAM_TO_DECK } from "../util/mutations"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const trashIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/trash-icon.png";
const editIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/edit-icon.png";
const analysisIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/analysis-icon.png";
const teamToWebIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-team-to-web.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const subLeaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/subleader-icon.png";


export default function DeckSelection({ characterDictionary, webOfTeam, userDeckData, selectedDeck, showCharactersInSelectedDeck, handleShowCharactersInSelectedDeck, addToWebOfTeam, removeFromWebOfTeam }) {
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openTeamAnalysis, setOpenTeamAnalysis] = useState(false)
  const [openMakeTeamForm, setOpenMakeTeamForm] = useState(false)
  const [openEditTeamForm, setOpenEditTeamForm] = useState(false)
  
  const [teamUsedInMakeTeamForm, setTeamUsedInMakeTeamForm] = useState([])
  const [teamUsedInForm, setTeamUsedInForm] = useState([])
  const [teamUsedInAnalysis, setTeamUsedInAnalysis] = useState([])
  
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
    console.log(team.characters)
    webOfTeam.map(character => {
      removeFromWebOfTeam(character)
    })
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

      <div className="flex p-2 justify-center items-center">
          <h2 className="pr-3 card-sm:p-3 text-sm card-sm:text-base font-bold">
            Gray Characters In Deck
          </h2>
          <div className="flex items-center">
            <label className="inline-flex relative items-center mr-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showCharactersInSelectedDeck}
                readOnly
              />
              <div
                onClick={() => {handleShowCharactersInSelectedDeck()}}
                className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[21%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
              ></div>
              <span className="ml-2 text-sm card-sm:text-base font-bold text-gray-900">
                ON
              </span>
            </label>
          </div>
      </div>

      <div className="flex flex-wrap w-full p-2 justify-around" key={allTeams}>
        {allTeams ? allTeams.map(team => (
          <div key={team._id} className='flex flex-col w-full max-w-[400px] lg:max-w-full pb-12 px-4 mb-2 border-4 border-black rounded-lg justify-around bg-orange-200 hover:bg-orange-400 relative'> 
              <img src={editIcon} onClick={() => handleEditTeamInfo(team)} className="w-10 h-fit w-full p-1 mt-2 mr-2 text-center hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 absolute top-0 right-0 cursor-pointer"/>
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
                  <CharacterCard individualCharacter={characterDictionary[team.info.leader] || 0} type={'leader'} />
                </div> 
                  {team.characters.map((character) => 
                    character.id !== team.info.leader && character.id !== team.info.subLeader ?
                    <div>
                    <CharacterCard individualCharacter={characterDictionary[character.id]} type={''} />
                    </div>
                    :
                    null
                  )}
              </div>

              <div className="flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Sub/Friend</p>
                    <div>
                    <CharacterCard individualCharacter={characterDictionary[team.info.subLeader] || 0} type={'subLeader'} />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Rotation 1</p>
                    <div className="flex">
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation1[0]] || 0} />
                      </div>
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation1[1]] || 0} />
                      </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="font-header text-xl card-sm:text-xl font-[100] border-black text-center">Rotation 2</p>
                    <div className="flex">
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation2[0]] || 0} />
                      </div>                                            
                      <div>
                        <CharacterCard individualCharacter={characterDictionary[team.info.rotation2[1]] || 0} />
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

const CharacterCard = ({individualCharacter, type}) => {
  if (individualCharacter === 0){
    return null
  }
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});

  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let characterThumb = new CloudinaryImage(`v1676235853/Character Thumb/${individualCharacter.id}`, cloudConfig, urlConfig);
  let characterRarity = new CloudinaryImage(`v1676242408/rarities-types/${individualCharacter.rarity}`, cloudConfig, urlConfig);
  let characterTypeBadge = new CloudinaryImage(`v1676242408/rarities-types/${individualCharacter.type.toLowerCase()}`, cloudConfig, urlConfig);
  let characterTypeBackground = new CloudinaryImage(`v1676242381/rarities-types/${individualCharacter.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);
 
  return (
    <>
    <div className='flex w-fit justify-center items-center relative'>
      <AdvancedImage
        className="w-[80px] card-sm:w-[80px] bottom-[5%] bg-no-repeat relative z-40"
        cldImg={characterThumb}
        alt={individualCharacter.name}
        plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
      />
      {type === 'leader' ? <img src={leaderIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
      {type === 'subLeader' ? <img src={subLeaderIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
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
        className="w-[45%] card-sm:w-[40%] absolute -top-[5%] card-sm:-top-[5%] right-[-6%] card-sm:right-[-2%] z-50"
        cldImg={characterTypeBadge}
        plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
      />
    </div>
</>
  );
}