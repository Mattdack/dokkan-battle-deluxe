import React, { useState, useRef } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { ADD_TEAM_POST_TO_STAGE } from "../../util/mutations"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

import CharacterSelectionModal from "./CharacterSelectionModal"
import { update } from "lodash";
import { object } from "prop-types";

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";
const hiddenPotentialIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/hidden-potential.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";


export default function MakeTeamFromScratch( {userData, stageData, characterDictionary, allItems, allSupportMemories, closeSelectTeam, open, onClose} ) {
  const [addTeamToStage, { error: teamAddedToPostError, data: teamAddedToPost }] = useMutation(ADD_TEAM_POST_TO_STAGE)

  const [characterObjects, setCharacterObjects] = useState([
    { characterObject: 'leader', role:'leader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 'subLeader', role:'subLeader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 1, id: 0, role:'character1', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 2, id: 0, role:'character2', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 3, id: 0, role:'character3', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 4, id: 0, role:'character4', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 5, id: 0, role:'character5', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 6, id: 0, role:'character6', leadeOrSub:'', type: 'none', rarity: 'none' },
    { characterObject: 7, id: 0, role:'character7', leadeOrSub:'', type: 'none', rarity: 'none' },
  ]);
  
  const [leaderHasBeenSelected, setLeaderHasBeenSelected] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  
  function handleOpenCharacterSelection(e, index) {
    e.preventDefault();
    setOpenCharacterSelectionModal(true);
    setSelectedCardIndex(index);
  }

  function handleCharacterSelection(selectedCharacter) {
    const updatedCharacterObjects = [...characterObjects];
    updatedCharacterObjects[selectedCardIndex].id = parseInt(selectedCharacter.id)
    updatedCharacterObjects[selectedCardIndex].type = selectedCharacter.type
    updatedCharacterObjects[selectedCardIndex].rarity = selectedCharacter.rarity
    setCharacterObjects(updatedCharacterObjects);
    setOpenCharacterSelectionModal(false);
  }

  const formRef = useRef(null);

  const [supportMemorySelection, setSupportMemorySelection] = useState({})
  
  const [itemSelection, setItemSelection] = useState([])
  function handleItemSelection(itemId) {
    setItemSelection((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        if (prev.length < 4) {
          return [...prev, itemId];
        } else {
          return [prev[1], prev[2], prev[3], itemId];
        }
      }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formObject = Object.fromEntries(formData);
    for (const [key, value] of formData.entries()) {
      // convert the value of the checkbox to a boolean
      const newValue = (value === 'on' || value === 'true') ? true : value;
      formObject[key] = newValue;
    }

    addTeamToStage ({
      variables:{
          userId: userData._id,
          stageId: stageData._id,
          teamInfo: {
            creator: userData._id,
            stageId: stageData._id,
            name: formObject.teamName,
            mission: formObject.mission || 'No Mission',
            teamArray: [
              characterObjects[2].id,
              characterObjects[3].id,
              characterObjects[4].id,
              characterObjects[5].id,
              characterObjects[6].id,
              characterObjects[7].id,
              characterObjects[8].id,
            ],
            leader: characterObjects[0].id ,
            subLeader: characterObjects[1].id,
            rotation1: [characterObjects[2].id, characterObjects[3].id],
            rotation2: [characterObjects[4].id, characterObjects[5].id],
            floaters: [characterObjects[6].id, characterObjects[7].id, characterObjects[8].id,],
            strategy: formObject.strategy,
            items: itemSelection,
            supportMemory: supportMemorySelection._id || null,
            character1: {
              EZA: formObject?.character1EZA || false,
              leaderOrSubLeader: formObject?.character1LeaderOrSub || '',
              characterId: characterObjects[2].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character1HiddenPotential1 || false,
                hiddenPotential2: formObject?.character1HiddenPotential2 || false,
                hiddenPotential3: formObject?.character1HiddenPotential3 || false,
                hiddenPotential4: formObject?.character1HiddenPotential4 || false
              },
              info: formObject.character1Info,
              sub:null
            },
            character2: {
              EZA: formObject?.character2EZA || false,
              leaderOrSubLeader: formObject?.character2LeaderOrSub || '',
              characterId: characterObjects[3].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character2HiddenPotential1 || false,
                hiddenPotential2: formObject?.character2HiddenPotential2 || false,
                hiddenPotential3: formObject?.character2HiddenPotential3 || false,
                hiddenPotential4: formObject?.character2HiddenPotential4 || false
              },
              info: formObject.character2Info,
              sub:null
            },
            character3: {
              EZA: formObject?.character3EZA || false,
              leaderOrSubLeader: formObject?.character3LeaderOrSub || '',
              characterId: characterObjects[4].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character3HiddenPotential1 || false,
                hiddenPotential2: formObject?.character3HiddenPotential2 || false,
                hiddenPotential3: formObject?.character3HiddenPotential3 || false,
                hiddenPotential4: formObject?.character3HiddenPotential4 || false
              },
              info: formObject.character3Info,
              sub:null
            },
            character4: {
              EZA: formObject?.character4EZA || false,
              leaderOrSubLeader: formObject?.character4LeaderOrSub || '',
              characterId: characterObjects[5].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character4HiddenPotential1 || false,
                hiddenPotential2: formObject?.character4HiddenPotential2 || false,
                hiddenPotential3: formObject?.character4HiddenPotential3 || false,
                hiddenPotential4: formObject?.character4HiddenPotential4 || false
              },
              info: formObject.character4Info,
              sub:null
            },
            character5: {
              EZA: formObject?.character5EZA || false,
              leaderOrSubLeader: formObject?.character5LeaderOrSub || '',
              characterId: characterObjects[6].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character5HiddenPotential1 || false,
                hiddenPotential2: formObject?.character5HiddenPotential2 || false,
                hiddenPotential3: formObject?.character5HiddenPotential3 || false,
                hiddenPotential4: formObject?.character5HiddenPotential4 || false
              },
              info: formObject.character5Info,
              sub:null
            },
            character6: {
              EZA: formObject?.character6EZA || false,
              leaderOrSubLeader: formObject?.character6LeaderOrSub || '',
              characterId: characterObjects[7].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character6HiddenPotential1 || false,
                hiddenPotential2: formObject?.character6HiddenPotential2 || false,
                hiddenPotential3: formObject?.character6HiddenPotential3 || false,
                hiddenPotential4: formObject?.character6HiddenPotential4 || false
              },
              info: formObject.character6Info,
              sub:null
            },
            character7: {
              EZA: formObject?.character7EZA || false,
              leaderOrSubLeader: formObject?.character7LeaderOrSub || '',
              characterId: characterObjects[8].id,
              hiddenPotential: {
                hiddenPotential1: formObject?.character7HiddenPotential1 || false,
                hiddenPotential2: formObject?.character7HiddenPotential2 || false,
                hiddenPotential3: formObject?.character7HiddenPotential3 || false,
                hiddenPotential4: formObject?.character7HiddenPotential4 || false
              },
              info: formObject.character7Info,
              sub:null
            },
          }
        }
      })
    .then((result) => {
      setCharacterObjects([
        { characterObject: 'leader', role:'leader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 'subLeader', role:'subLeader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 1, id: 0, role:'character1', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 2, id: 0, role:'character2', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 3, id: 0, role:'character3', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 4, id: 0, role:'character4', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 5, id: 0, role:'character5', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 6, id: 0, role:'character6', leadeOrSub:'', type: 'none', rarity: 'none' },
        { characterObject: 7, id: 0, role:'character7', leadeOrSub:'', type: 'none', rarity: 'none' },
      ])
      onClose()
      closeSelectTeam()
      window.location.assign(process.env.PUBLIC_URL);
    })
    .catch((error) => {
      console.log(error)
      setErrorMessage(error.message)
    });
  }

  const [errorMessage, setErrorMessage] = useState('')

  const sortedItems = allItems.slice().sort((a,b) =>{
    const idA = a.id
    const idB = b.id
    return idA - idB
  })
  
  const sortedSupportMemories = allSupportMemories.slice().sort((a,b) =>{
    const idA = a.id
    const idB = b.id
    return idA - idB
  })

  const [openCharacterSelectionModal, setOpenCharacterSelectionModal] = useState(false)

  function handleClose () {
    setErrorMessage('')
    setCharacterObjects([
      { characterObject: 'leader', role:'leader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 'subLeader', role:'subLeader', id: 0, leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 1, id: 0, role:'character1', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 2, id: 0, role:'character2', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 3, id: 0, role:'character3', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 4, id: 0, role:'character4', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 5, id: 0, role:'character5', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 6, id: 0, role:'character6', leadeOrSub:'', type: 'none', rarity: 'none' },
      { characterObject: 7, id: 0, role:'character7', leadeOrSub:'', type: 'none', rarity: 'none' },
    ])
    onClose()
  }

  if (!open) return null;
  return ReactDom.createPortal(
    <>
    <CharacterSelectionModal characterDictionary={characterDictionary} userData={userData} handleCharacterSelection={handleCharacterSelection} open={openCharacterSelectionModal} onClose={() => setOpenCharacterSelectionModal(false)}/>
     <div 
      onClick={() => handleClose()}
      className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
        <div 
        onClick={(e) => e.stopPropagation()}
        className="w-3/4 lg:w-3/4 h-[90vh] lg:max-h-3/4 px-5 logo-md:px-10 py-16  border-4 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[1000] overflow-y-auto">
          <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
        <form className="flex flex-col w-full" ref={formRef} onSubmit={handleSubmit}>

          <div className="flex flex-col w-full justify-around border-4 border-black rounded-lg">
            <p className="font-header flex w-full mb-4 bg-orange-400 border-b-4 border-black justify-center items-center text-center text-2xl card-sm:text-5xl">Team Layout</p>
          
            <div className="flex flex-wrap mb-6 justify-around items-center">

              <div className="flex card-sm:flex-col card-sm:w-fit px-2 justify-around">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-header flex card-sm:w-fit text-base justify-center items-center card-sm:text-xl">Leader</p>
                  <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 0)}>
                    <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                    <CharacterCard individualCharacter={characterObjects[0]} leaderOrSub={'leader'}/>
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-header flex card-sm:w-fit text-base justify-center card-sm:text-xl">Friend</p>
                  <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 1)}>
                    <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                    <CharacterCard individualCharacter={characterObjects[1]} leaderOrSub={'subLeader'}/>
                  </button>
                </div>

              </div>

              <div className="flex flex-col px-2 justify-center items-center">

                <div className="flex flex-col w-full">

                  <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 1</p>
                  <div className="flex justify-center w-full">
                  <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 2)}>
                    <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                    <CharacterCard individualCharacter={characterObjects[2]}/>
                  </button>


                    <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 3)}>
                      <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                      <CharacterCard individualCharacter={characterObjects[3]}/>
                    </button>
                  </div>

                </div>
                <div className="flex flex-col ">

                  <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 2</p>
                  <div className="flex justify-center w-full">
                    <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 4)}>
                    <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                    <CharacterCard individualCharacter={characterObjects[4]}/>
                    </button>
                    <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 5)}>
                    <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                    <CharacterCard individualCharacter={characterObjects[5]}/>
                    </button>
                  </div>

                </div>

              </div>

              <div className="flex flex-row flex-wrap py-4 justify-center items-center">

                <p className="font-header flex w-full text-base card-sm:text-xl justify-center">Float Characters</p>
                <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 6)}>
                  <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                  <CharacterCard individualCharacter={characterObjects[6]}/>
                </button>
                <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 7)}>
                  <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                  <CharacterCard individualCharacter={characterObjects[7]}/>
                </button>
                <button className='relative' onClick={(e) => handleOpenCharacterSelection(e, 8)}>
                  <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[1000] opacity-0 hover:opacity-100 transition-opacity duration-300">Select Character</div>
                  <CharacterCard individualCharacter={characterObjects[8]}/>
                </button>

              </div>
            </div>
            <p className="flex w-full p-2 text-gray-500 justify-center items-center text-center ">*your first rotation characters are the first two characters in the Team Information down below, the next two characters are the characters in the second rotation, and the float characters are the last 3 characters*</p>
          </div>

          <div className="mt-8 border-4 border-black rounded-lg">
            <p className="font-header flex w-full bg-orange-400 border-b-4 border-black justify-center items-center text-center text-2xl card-sm:text-5xl">Team information</p>

            <div className="flex flex-col w-full items-center">
              <h1 className="font-header card-sm:text-2xl">Team Name</h1>
              <input
                  name='teamName'
                  className="rounded-lg px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
                  required
              />
            </div>

            {stageData.missions.length > 0 &&
              <label htmlFor='mission' className="flex flex-col lg:flex-row w-full py-2 justify-center items-center font-bold">
                <p className="mr-2">Mission Accomplished: </p>
                <select className="flex w-full card-sm:w-fit font-base text-base truncate" name='mission' id="mission">
                    <option value='No Mission'>No Mission</option>
                    {stageData.missions.map((mission) => (
                      <option className="font-bold font-base" key={mission} value={mission}>
                        {mission}
                      </option>
                    ))}
                </select>
              </label>
            }
            {characterObjects
            // slice takes out the first two.....leader/subLeader
            .slice(2,9)
            // map over the rest of them
            .map((individualCharacter) => (
              <CharacterInfoBar
                key={individualCharacter.characterObject + individualCharacter.id} 
                role={individualCharacter.role}
                leadeOrSub={individualCharacter.leadeOrSub || ''} 
                character={individualCharacter}
                characterObjects={characterObjects}
              />
            ))}
            <div className="flex flex-wrap justify-center border-t-4 border-black">
              <h1 className="font-header w-full card-sm:text-2xl text-center ">Item Selection</h1>
              <div className="flex flex-wrap h-fit justify-center overflow-y-auto">
                {sortedItems.map((item) => (
                  <ItemSelection key={item.id} item={item} itemSelection={itemSelection} handleItemSelection={handleItemSelection}/>
                ))}
              </div>
                <p className="w-full py-2 text-center text-gray-500">*if no item is selected, the team posted will show 4 empty item slots*</p>
            </div>
            <div className="flex flex-wrap justify-center mb-4 border-y-4 border-black">
              <h1 className="font-header w-full card-sm:text-2xl text-center ">Support Memory Selection</h1>
              <div className="flex flex-wrap h-fit justify-center overflow-y-auto">
                {sortedSupportMemories.map((supportMemory) => (
                  <SupportMemorySelection key={supportMemory.id} supportMemory={supportMemory} supportMemorySelection={supportMemorySelection} setSupportMemorySelection={setSupportMemorySelection}/>
                ))}
              </div>
              <p className="w-full py-2 text-center text-gray-500">*if no support memory is selected, the team posted will show an empty support memory slot*</p>
            </div>
            <div className="px-4">
              <h1 className="font-header w-full text-lg card-sm:text-2xl text-center ">Strategy for team</h1>
              <textarea
                name='strategy'
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
                rows="6"
                // defaultValue={team.info.notes}
                maxLength="2500"
                required
              ></textarea>
            </div>
            <p className="px-4 text-2xl font-bold text-red-500">{errorMessage}</p>
            <div className="flex flex-col w-full pb-4 justify-center items-center">
              <p className="w-full pt-4 text-gray-500 text-base font-bold text-center">*POST WARNING: once a team has been posted to a stage, it currently cannot be edited, although the edit feature is under development. We encourage users to look over the character information and strategy they have entered to check for miss spellings and correct EZA / Hidden Potential information.*</p>
              <button type="submit" className="flex w-1/2 p-2 mt-4 justify-center border-4 border-black text-2xl font-bold items-center text-center bg-orange-400 hover:bg-orange-500 transition ease-in-out">Submit</button>
            </div>  
          </div>
        </form>
      </div>
    </div>
    </>,document.getElementById("MakeTeamFromScratch")
  );
}

const CharacterInfoBar = ({ character, role, leadeOrSub, characterObjects }) => {
  return (
    <div className="flex flex-col logo-md:flex-row items-center w-full border-t-4 border-black">
      <div className="flex flex-col w-fit p-2 justify-center items-center">
        <CharacterCard individualCharacter={character} leadeOrSub={leadeOrSub}/>
        <div className="flex flex-col w-full justify-center items-center">
          <label htmlFor={`${role}EZA`} className="flex px-1 py-2 justify-center items-center font-bold">
            EZA:
            <input
              type="checkbox"
              name={`${role}EZA`}
              id={`${role}EZA`}
              defaultChecked={false}
              className="ml-2 w-4 h-4"
            />
          </label>
          {(character.id === characterObjects[0].id || character.id === characterObjects[1].id) &&
            <select
              name={`${role}LeaderOrSub`}
              id={`${role}LeaderOrSub`}
              className='w-fit border-2 border-black mb-3 text-center'
            >
              <option value='leader'>Leader</option>
              <option value='subLeader'>Friend</option>
            </select>
          }
        </div>
        
        <div className="flex justify-around">
            <input type="checkbox" id={`${role}HiddenPotential1`} name={`${role}HiddenPotential1`} value={true} defaultChecked={false} className={`hidden peer/1`}/>
            <label 
            htmlFor={`${role}HiddenPotential1`} 
            className={`grayscale inline-flex items-center justify-between w-full px-1 rounded-lg cursor-pointer peer-checked/1:border-blue-600 hover:text-gray-600 dark:peer-checked/1:text-gray-300 peer-checked/1:text-gray-600 peer-checked/1:grayscale-0`}>                           
              <img src={hiddenPotentialIcon} className="card-sm:w-full w-3/4"/>
            </label>
            <input type="checkbox" id={`${role}HiddenPotential2`} name={`${role}HiddenPotential2`} value={true} defaultChecked={false} className={`hidden peer/2`}/>
            <label 
            htmlFor={`${role}HiddenPotential2`} 
            className={`grayscale inline-flex items-center justify-between w-full px-1 rounded-lg cursor-pointer peer-checked/2:border-blue-600 hover:text-gray-600 dark:peer-checked/2:text-gray-300 peer-checked/2:text-gray-600 peer-checked/2:grayscale-0`}>                           
              <img src={hiddenPotentialIcon} className="card-sm:w-full w-3/4"/>
            </label>
            <input type="checkbox" id={`${role}HiddenPotential3`} name={`${role}HiddenPotential3`} value={true} defaultChecked={false} className={`hidden peer/3`}/>
            <label 
            htmlFor={`${role}HiddenPotential3`} 
            className={`grayscale inline-flex items-center justify-between w-full px-1 rounded-lg cursor-pointer peer-checked/3:border-blue-600 hover:text-gray-600 dark:peer-checked/3:text-gray-300 peer-checked/3:text-gray-600 peer-checked/3:grayscale-0`}>                           
              <img src={hiddenPotentialIcon} className="card-sm:w-full w-3/4"/>
            </label>
            <input type="checkbox" id={`${role}HiddenPotential4`} name={`${role}HiddenPotential4`} value={true} defaultChecked={false} className={`hidden peer/4`}/>
            <label 
            htmlFor={`${role}HiddenPotential4`} 
            className={`grayscale inline-flex items-center justify-between w-full px-1 rounded-lg cursor-pointer peer-checked/4:border-blue-600 hover:text-gray-600 dark:peer-checked/4:text-gray-300 peer-checked/4:text-gray-600 peer-checked/4:grayscale-0`}>                           
              <img src={hiddenPotentialIcon} className="card-sm:w-full w-3/4"/>
            </label>            
        </div>
      </div>

      <div className="logo-md:h-[250px] logo-md:border-2 border-black"></div>

      <div className="flex flex-col w-full justify-center items-center text-center">
        <div className="flex flex-col w-full p-2 relative">
          <p className="flex font-header justify-center text-lg logo-md:text-2xl">
            Character Strategy:
          </p>
          <textarea
            type="input"
            name={`${role}Info`}
            id={`${role}Info`}
            className="form-control flex px-3 py-1.5 text-base font-bold text-black bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-black focus:border-solid focus:outline-none "
            rows="6"
            maxLength="1000"
            required
          />
        </div>
      </div>

    </div>
  );
};

const ItemSelection = ({ item, itemSelection, handleItemSelection }) => {
  let isItemSelected = itemSelection.includes(item._id)
  return (
    <div 
    onClick={() => handleItemSelection(item._id)}
    style={{ cursor: "pointer" }}
    className={`w-fit relative p-2
    ${isItemSelected ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
        <ItemCard item={item}/>
    </div>
  );
}

const SupportMemorySelection = ({ supportMemory, supportMemorySelection, setSupportMemorySelection }) => {
  let isSupportMemorySelected = supportMemorySelection.id === (supportMemory.id)
  return (
    <div 
    onClick={() => setSupportMemorySelection(supportMemory)}
    style={{ cursor: "pointer" }}
    className={`w-fit relative px-2
    ${isSupportMemorySelected ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
        <SupportMemoryCard supportMemory={supportMemory}/>
    </div>
  );
}

const CharacterCard = ({individualCharacter, leaderOrSub}) => {
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
            className={`w-[90px] ${individualCharacter.id === 0 ? 'w-[70px] card-sm:w-[100px] m-2' : 'card-sm:w-[120px]' } bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40`}
            cldImg={characterThumb}
            alt={individualCharacter.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          {individualCharacter.rarity !== 'none' && leaderOrSub === 'leader' ? <img src={leaderIcon} className='w-[72%] card-sm:w-[72%] -top-[2%] right-[33%] absolute z-50'/> : null}
          {individualCharacter.rarity !== 'none' && leaderOrSub === 'subLeader' ? <img src={friendIcon} className='w-[72%] card-sm:w-[72%] -top-[2%] right-[33%] absolute z-50'/> : null}

          {individualCharacter.rarity !== 'none' &&
            <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />}

          {individualCharacter.type !== 'none' &&
            <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />}

          {individualCharacter.type !== 'none' &&
            <AdvancedImage
            className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
            cldImg={characterTypeBadge}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />}
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
    <>
        <div className='w-fit relative'>
          <AdvancedImage
            className="h-[50px] card-sm:h-[80px] w-[50px] card-sm:w-[80px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
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
    </>
  );
}

const SupportMemoryCard = ({supportMemory}) => {
  // Set the Cloud configuration and URL configuration
  let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  let urlConfig = new URLConfig({secure: true});
  // Instantiate and configure a CloudinaryImage object.
  let supportMemoryThumb = new CloudinaryImage(`Support Memories/${supportMemory.id}`, cloudConfig, urlConfig);
  
  return (
    <>
        <div className='w-fit relative'>
          <AdvancedImage
            className={`w-[70px] card-sm:w-[100px] ${supportMemory.id === 0 && 'pt-4'} bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40`}
            cldImg={supportMemoryThumb}
            alt={supportMemory.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
        </div>
    </>
  );
}

