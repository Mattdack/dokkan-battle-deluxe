import React, { useState, useRef } from "react";
import ReactDom from "react-dom";

import { useMutation } from "@apollo/client";
import { ADD_TEAM_POST_TO_STAGE } from "../../util/mutations"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";
const hiddenPotentialIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/hidden-potential.png";
const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";


export default function NewTeamForTeamPostModal( {team, userData, stageData, characterDictionary, allItems, allSupportMemories, closeSelectTeam, open, onClose} ) {
  const [addTeamToStage, { error: teamAddedToPostError, data: teamAddedToPost }] = useMutation(ADD_TEAM_POST_TO_STAGE)
  
  let character1Object = {}
  let character2Object = {}
  let character3Object = {}
  let character4Object = {}
  let character5Object = {}
  let character6Object = {}
  let character7Object = {}
  let entireTeamObjects = []
  let floaterIds = []

  if(team?.characters){
    if (team.characters.length === 7) {
      let entireTeamIdArray = team.characters.map((character) => character.id)
      const rotationIds = [...team.info.rotation1, ...team.info.rotation2]
      //set entire float to team array of ids
      floaterIds = [...entireTeamIdArray]
      for (let i = 0; i < rotationIds.length; i++) {
        const index = floaterIds.indexOf(rotationIds[i]);
        //remove the rotation characters to have the 3 left over characters
        if (index > -1) {
          floaterIds.splice(index, 1);
        }
      }

      character1Object = characterDictionary[rotationIds[0]]
      character2Object = characterDictionary[rotationIds[1]]
      character3Object = characterDictionary[rotationIds[2]]
      character4Object = characterDictionary[rotationIds[3]]
      character5Object = characterDictionary[floaterIds[0]]
      character6Object = characterDictionary[floaterIds[1]]
      character7Object = characterDictionary[floaterIds[2]]

      let preEntireTeamObjects = [
        character1Object,
        character2Object,
        character3Object,
        character4Object,
        character5Object,
        character6Object,
        character7Object,
      ];

      entireTeamObjects = preEntireTeamObjects.map((character, index) => {
        let type = character.id === team.info.leader ? 'leader' : null || character.id === team.info.subLeader ? 'subLeader' : null
        return {
          role: `character${index + 1}`,
          type,
          character,
        };
      });

    } else if (team.characters.length === 6) {
      let entireTeamIdArray = team.characters.map((character) => character.id)
      entireTeamIdArray.push(team.info.leader)
      const rotationIds = [...team.info.rotation1, ...team.info.rotation2]
      //set entire float to team array of ids
      floaterIds = [...entireTeamIdArray]
      for (let i = 0; i < rotationIds.length; i++) {
        const index = floaterIds.indexOf(rotationIds[i]);
        //remove the rotation characters to have the 3 left over characters
        if (index > -1) {
          floaterIds.splice(index, 1);
        }
      }

      character1Object = characterDictionary[rotationIds[0]]
      character2Object = characterDictionary[rotationIds[1]]
      character3Object = characterDictionary[rotationIds[2]]
      character4Object = characterDictionary[rotationIds[3]]
      character5Object = characterDictionary[floaterIds[0]]
      character6Object = characterDictionary[floaterIds[1]]
      character7Object = characterDictionary[floaterIds[2]]

      let leaderAssigned = false;
      let preEntireTeamObjects = [
        character1Object,
        character2Object,
        character3Object,
        character4Object,
        character5Object,
        character6Object,
        character7Object,
      ];

      entireTeamObjects = preEntireTeamObjects.map((character, index) => {
        let type = character.id === team.info.leader ? (leaderAssigned ? 'subLeader' : 'leader') : null;
        if (type === 'leader') leaderAssigned = true;
        return {
          role: `character${index + 1}`,
          type,
          character,
        };
      });
    }
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

    console.log(formObject)

    addTeamToStage ({
      variables:{
          userId: userData.data._id,
          stageId: stageData._id,
          teamInfo: {
            creator: userData.data._id,
            stageId: stageData._id,
            name: formObject.teamName,
            teamArray: [
                character1Object.id,
                character2Object.id,
                character3Object.id,
                character4Object.id,
                character5Object.id,
                character6Object.id,
                character7Object.id,
            ],
            leader: team.info.leader,
            subLeader: team.info.subLeader,
            rotation1: team.info.rotation1,
            rotation2: team.info.rotation2,
            floaters: floaterIds,
            strategy: formObject.strategy,
            items: itemSelection,
            supportMemory: supportMemorySelection._id || null,
            character1: {
              EZA: formObject?.character1EZA || false,
              role: formObject?.character1CharacterRole,
              characterId: character1Object.id,
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
              role: formObject?.character2CharacterRole,
              characterId: character2Object.id,
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
              role: formObject?.character3CharacterRole,
              characterId: character3Object.id,
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
              role: formObject?.character4CharacterRole,
              characterId: character4Object.id,
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
              role: formObject?.character5CharacterRole,
              characterId: character5Object.id,
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
              role: formObject?.character6CharacterRole,
              characterId: character6Object.id,
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
              role: formObject?.character7CharacterRole,
              characterId: character7Object.id,
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

  if (!open) return null;
  return ReactDom.createPortal(
     <div 
      // onClick={onClose}
      className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
        <div className="w-3/4 lg:w-3/4 h-[90vh] lg:max-h-3/4 px-5 logo-md:px-10 py-16  border-4 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[1000] overflow-y-auto">
          <img onClick={onClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
        <form className="flex flex-col w-full" ref={formRef} onSubmit={handleSubmit}>

          <div className="flex flex-col w-full justify-around ">
            <p className="font-header flex w-full mb-4 border-b-4 border-black justify-center items-center text-2xl card-sm:text-5xl">Team Layout</p>
          
            <div className="flex flex-wrap mb-6 justify-around items-center">
              <div className="flex card-sm:flex-col card-sm:w-fit px-2 justify-around">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-header flex card-sm:w-fit text-base justify-center items-center card-sm:text-xl">Leader</p>
                  <CharacterCard individualCharacter={characterDictionary[team?.info.leader]} type={'leader'}/>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-header flex card-sm:w-fit text-base justify-center card-sm:text-xl">Sub Leader</p>
                  <CharacterCard individualCharacter={characterDictionary[team?.info.subLeader]} type={'subLeader'}/>
                </div>
              </div>

              <div className="flex flex-col px-2 justify-center items-center">
                <div className="flex flex-col w-full">
                  <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 1</p>
                  <div className="flex justify-center w-full">
                    <CharacterCard individualCharacter={characterDictionary[team?.info.rotation1[0]]}/>
                    <CharacterCard individualCharacter={characterDictionary[team?.info.rotation1[1]]}/>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 2</p>
                  <div className="flex justify-center w-full">
                    <CharacterCard individualCharacter={characterDictionary[team?.info.rotation2[0]]}/>
                    <CharacterCard individualCharacter={characterDictionary[team?.info.rotation2[1]]}/>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap py-4 justify-center items-center">
                <p className="font-header flex w-full text-base card-sm:text-xl justify-center">Float Characters</p>
                <CharacterCard individualCharacter={character5Object}/>
                <CharacterCard individualCharacter={character6Object}/>
                <CharacterCard individualCharacter={character7Object}/>
              </div>
            </div>

          </div>

          <h1 className="font-header card-sm:text-2xl">Team Name</h1>
          <input
              name='teamName'
              className="rounded-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
              defaultValue={team.name}
          />
          {entireTeamObjects.map((individualCharacter) => (
            <CharacterInfoBar
              key={individualCharacter.role + individualCharacter.character.id} 
              role={individualCharacter.role}
              cardType={individualCharacter.type || ''} 
              character={individualCharacter.character}
              team={team}
            />
          ))}
          <div className="flex flex-wrap justify-center mb-4 border-4 border-black rounded-lg">
            <h1 className="font-header w-full card-sm:text-2xl text-center ">Item Selection</h1>
            <div className="flex flex-wrap max-h-[30vh] justify-center overflow-y-auto">
              {allItems.map((item) => (
                <ItemSelection key={item.id} item={item} itemSelection={itemSelection} handleItemSelection={handleItemSelection}/>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center mb-4 border-4 border-black rounded-lg">
            <h1 className="font-header w-full card-sm:text-2xl text-center ">Support Memory Selection</h1>
            <div className="flex flex-wrap max-h-[30vh] justify-center overflow-y-auto">
              {allSupportMemories.map((supportMemory) => (
                <SupportMemorySelection key={supportMemory.id} supportMemory={supportMemory} supportMemorySelection={supportMemorySelection} setSupportMemorySelection={setSupportMemorySelection}/>
              ))}
            </div>
          </div>
          <h1 className="font-header w-full card-sm:text-2xl text-center">Strategy with the team</h1>
          <textarea
            name='strategy'
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
            rows="6"
            defaultValue={team.info.notes}
            maxlength="2500"
            required
          ></textarea>
          <p className="text-2xl font-bold text-red-500">{errorMessage}</p>
          <div className="flex flex-col w-full justify-center items-center">
            <p className="w-full pt-4 text-gray-500 text-base font-bold text-center">*POST WARNING: once a team has been posted to a stage, it currently cannot be edited, although the edit feature is under development. We encourage users to look over the character information and strategy they have entered to check for miss spellings and correct EZA / Hidden Potential information.*</p>
            <button type="submit" className="flex w-fit p-2 mt-4 justify-center border-4 border-black text-2xl font-bold items-center text-center bg-orange-400 hover:bg-orange-500 transition ease-in-out">Submit</button>
          </div>  
        </form>
      </div>
    </div>,
    document.getElementById("NewTeamForTeamPostModal")
  );
}

const CharacterInfoBar = ({ character, role, cardType, team }) => {
  return (
    <div className="flex flex-col logo-md:flex-row items-center w-full my-2 border-4 border-black rounded-lg">
      <div className="flex flex-col w-fit p-2 justify-center items-center">
        <CharacterCard individualCharacter={character} type={cardType}/>
        <div>
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
        </div>
        <div className="flex justify-around">
          <input
              type="hidden"
              name={`${role}CharacterRole`}
              id={`${role}CharacterRole`}
              value={cardType}
            />
            
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

      <div className="flex flex-col w-full justify-center items-center text-center logo-md:border-l-4 border-black">
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
            maxlength="1000"
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

const CharacterCard = ({individualCharacter, type}) => {
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
          <AdvancedImage
            className="h-[90px] card-sm:h-[120px] w-[90px] card-sm:w-[120px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          {type === 'leader' ? <img src={leaderIcon} className='w-[72%] card-sm:w-[72%] -top-[2%] right-[33%] absolute z-50'/> : null}
          {type === 'subLeader' ? <img src={friendIcon} className='w-[72%] card-sm:w-[72%] -top-[2%] right-[33%] absolute z-50'/> : null}
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
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