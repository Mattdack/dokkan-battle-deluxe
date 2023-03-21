import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import NewTeamForTeamPostModal from "./NewTeamForTeamPostModal"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";

export default function SelectTeamToStageModal( {userDecks, userData, stageData, characterDictionary, allItems, allSupportMemories, open, onClose} ) {
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [selectedDeckName, setSelectedDeckName] = useState(selectedDeck?.name)
  const [selectedTeam, setSelectedTeam] = useState(null)

  const [teamsNotSelectableError, setTeamsNotSelectableError] = useState(null)

  const [teamIsDisabled, setTeamIsDisabled] = useState(false)

  const [openNewTeamForTeamPostModal, setOpenNewTeamForTeamPostModal] = useState(false)

  const handleSelectedDeck = (deckId) => {
    const selectedDeck = userDecks.find(deck => deck._id === deckId);
    setSelectedDeck(selectedDeck);
  }

  const handleSelectedTeam = (team) => {
    setSelectedTeam(team)
    setOpenNewTeamForTeamPostModal(true)
  }

  const handleIsTeamDisabled = (team) => {
    if (!team.info.leader || team.info.leader === null || !team.info.subLeader || team.info.subLeader === null || !team.info.rotation1 || team.info.rotation1.includes(0) || !team.info.rotation2 || team.info.rotation2.includes(0)){
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (selectedDeck) {
      const teamsWithNoLeaderOrRotation = selectedDeck.teams.filter(team => handleIsTeamDisabled(team));
      if (teamsWithNoLeaderOrRotation.length > 0) {
        setTeamsNotSelectableError(`The reason some teams are grayed out and unselectable is because these teams have no selected leader, sub-leader, or rotations. Go back to your personal team decks and edit these teams to ensure that these items are included. If these items are filled out and you are still having issues adding a team, please contact us at the Help page.`);
      } else {
        setTeamsNotSelectableError('');
      }
    }
  }, [selectedDeck]);

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <NewTeamForTeamPostModal team={selectedTeam} userData={userData} stageData={stageData} characterDictionary={characterDictionary} allItems={allItems} allSupportMemories={allSupportMemories} closeSelectTeam={onClose} open={openNewTeamForTeamPostModal} onClose={() => setOpenNewTeamForTeamPostModal(false)}/>

      <div 
      // onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999]">
        <div className="flex flex-col w-4/5 lg:w-[70%] max-h-[80%] px-2 card-sm:px-4 pt-16 pb-4 card-sm:p-12 border-4 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[900] top-[10%] lg:top-[10%] right-[10%] lg:right-[15%] overflow-y-auto">
          <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
         {/* <h1 className="text-lg font-bold">Great news, we're busy! Bad news, character load times will be slower until servers can be upgraded. We apologize for the slower load times and we hope you continue to enjoy using the app!</h1> */}
         <p className="text-lg card-sm:text-2xl font-bold my-2">Which Deck Do You Want To Select From?</p>
         <select className={`disabled:bg-gray-500 flex w-full p-2 my-2 h-fit border-2 card-sm:text-3xl font-bold border-black bg-orange-200 rounded-lg justify-center items-center text-center cursor-pointer`} 
          id="deckSelectForTeamPost" 
          value={selectedDeckName}
          onChange={(e) => handleSelectedDeck(e.target.value)}
          >
            <option value=""></option>
            {userDecks && userDecks.map((deck)=>
              <option className='font-bold' key={deck._id} value={deck._id}>{deck.name}</option>
            )}
          </select>
          
          {teamsNotSelectableError && <div className="flex w-full p-2 my-2 border-4 border-black card-sm:text-xl rounded-lg font-bold bg-orange-400">{teamsNotSelectableError}</div>}

          {selectedDeck && selectedDeck.teams.map((team) => (
            <button disabled={handleIsTeamDisabled(team)}
            onClick={() => handleSelectedTeam(team)}
            className='disabled:grayscale'>
              <div className="bg-orange-300 hover:bg-orange-400">
                <div key={team.name} className="font-header flex w-full h-fit py-4 border-x-4 border-t-4 border-black text-xl card-sm:text-2xl underline underline-offset-8 decoration-solid decoration-2 rounded-t-lg justify-center items-center text-center relative">
                  {team.name}
                </div>
                <div className="flex flex-wrap w-full h-1/4 py-2 px-1 card-sm:px-8 mb-2 border-x-4 border-b-4 border-black rounded-b-lg justify-around relative">
                  {team.characters.length === 6 &&
                    <>
                      <CharacterCard individualCharacter={characterDictionary[team?.info?.leader] || 0} team={team} type={'leader'} />
                      
                      {team.characters.map((individualCharacter) => {
                        if (team.info.leader !== individualCharacter.id && team.info.subLeader !== individualCharacter.id) {
                          return <CharacterCard individualCharacter={individualCharacter} team={team} key={individualCharacter.id}/>;
                        }
                        return null;
                      })}

                      <CharacterCard individualCharacter={characterDictionary[team?.info?.subLeader || 0]} team={team} type={'subleader'}/>
                    </>
                  }
                  {team.characters.length !== 6 &&
                    <>
                      {team.characters.map((individualCharacter => (
                        (team.info.leader === individualCharacter.id) ?
                          <CharacterCard individualCharacter={individualCharacter} team={team} type={'leader'} key={'leader'}/> : null
                      )))}
                      {team.characters.map((individualCharacter => (
                        (team.info.leader !== individualCharacter.id && team.info.subLeader !== individualCharacter.id) ?
                        <CharacterCard individualCharacter={individualCharacter} team={team} key={individualCharacter.id}/> : null
                      )))}
                      {team.characters.map((individualCharacter => (
                        (team.info.subLeader === individualCharacter.id && individualCharacter.id !== team.info.leader) ?
                          <CharacterCard individualCharacter={individualCharacter} team={team} type={'subleader'} key={'subLeader'}/> : null
                      )))}
                    </>
                  }
                </div>
              </div>
            </button>
          )).reverse()}
        </div>
      </div>
    </>,
    document.getElementById("SelectTeamToStageModal")
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
        <div className='w-fit relative'>
          {type === 'leader' ? <img src={leaderIcon} className='w-[56px] card-sm:w-[80px] -top-[2%] right-[33%] absolute z-50'/> : null}
          {type === 'subleader' ? <img src={friendIcon} className='w-[56px] card-sm:w-[80px] -top-[2%] right-[33%] absolute z-50'/> : null}
          <AdvancedImage
            className="h-[70px] card-sm:h-[100px] w-[70px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[40%] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            cldImg={characterTypeBadge}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
        </div>
    </>
  );
}