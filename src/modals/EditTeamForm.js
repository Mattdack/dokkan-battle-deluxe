import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import Auth from "../util/auth";

import ErrorModal from "./ErrorModal";

import { useMutation } from "@apollo/client";
import { EDIT_TEAM_INFO, REMOVE_TEAM_FROM_DECK } from "../util/mutations"

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";

export default function EditTeamForm( {team, selectedDeck, open, onClose} ) {
  const [editTeamInfo, { error: editTeamInfoError, data: updatedTeamInfo }] = useMutation(EDIT_TEAM_INFO)
  const findRotation1Characters = team?.info?.rotation1 || []
  const findRotation2Characters = team?.info?.rotation2 || []

  const [rotation1Characters, setRotation1Characters] = useState([]);
  const [rotation2Characters, setRotation2Characters] = useState([]);
  const [errorDiv, setErrorDiv] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // this useEffect is ABSOLUTELY needed for updating the rotation1Characters to show the characters previously in the rotation of the team.info
  useEffect(() => {
    setRotation1Characters(findRotation1Characters);
    setRotation2Characters(findRotation2Characters);
  }, [open]);
  
  if (!open) return null;
  if (!team) return null
  
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if(rotation1Characters[0] === 0 || rotation1Characters[1] === 0 || rotation2Characters[0] === 0 || rotation2Characters[1] === 0){
      setErrorMessage('Error: must select two characters for each rotation')
      setErrorDiv(true)
      throw new Error
    }

    const form = document.forms[0]
    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData)
    const profileId = Auth.getProfile()?.data?._id;
    const teamId = team._id

    if(team.characters.length === 6){
      if(formObject.leaderSelect !== formObject.subLeaderSelect){
        setErrorMessage('Error: because you have only six characters on your team, the same character must be the leader and sub/friend leader')
        setErrorDiv(true)
        throw new Error
      }
    }
    if(team.characters.length === 7){
      if(formObject.leaderSelect === formObject.subLeaderSelect){
        setErrorMessage('Error: because you have seven characters on your team, the same character cannot be the leader and sub/friend leader')
        setErrorDiv(true)
        throw new Error
      }
    }
    if(typeof formObject.leaderSelect === 'undefined' || formObject.leaderSelect === null){
      setErrorMessage('Error: must select a leader')
      setErrorDiv(true)
      throw new Error
    }
    if(typeof formObject.subLeaderSelect === 'undefined' || formObject.subLeaderSelect === null){
      setErrorMessage('Error: must select a sub-leader')
      setErrorDiv(true)
      throw new Error
    }

    editTeamInfo ({
      variables:{
        profileId: profileId,
        deckId: selectedDeck,
        teamId: teamId,
        newTeamName: formObject.newTeamName,
        info: {
          leader: parseInt(formObject.leaderSelect),
          subLeader: parseInt(formObject.subLeaderSelect),
          rotation1: rotation1Characters,
          rotation2: rotation2Characters,
          notes: formObject.strategy
        }
      }
    })
    .then((result) => {
      onClose()
      setRotation1Characters([])
      setRotation2Characters([])
      setErrorMessage('')
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setErrorDiv(true);
    });
  };
  
  function handleRotation1Characters(characterId) {
    setRotation1Characters((prev) => {
      if (prev.includes(characterId)) {
        // console.log('removed from rotation')
        return prev.filter((id) => id !== characterId);
      } else {
        // console.log('placed into deck')
        if (prev.length < 2) {
          return [...prev, characterId];
        } else {
          return [prev[1], characterId];
        }
      }
    });
  }

  function handleRotation2Characters(characterId) {
    setRotation2Characters((prev) => {
      if (prev.includes(characterId)) {
        // console.log('removed from rotation')
        return prev.filter((id) => id !== characterId);
      } else {
        // console.log('placed into rotation')
        if (prev.length < 2) {
          return [...prev, characterId];
        } else {
          return [prev[1], characterId];
        }
      }
    });
  }
  
  function handleOnClose () {
    onClose()
    setRotation1Characters([])
    setRotation2Characters([])
    setErrorMessage('')
  }

  return ReactDom.createPortal(
    <>
     <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.2] z-[900]">
        <div className="w-3/4 lg:max-w-[60%] h-[90%] px-4 pt-14 pb-4 card-sm:p-10 border-4 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[900] top-[5%] right-[13%] lg:top-[10%] lg:left-[5%] overflow-y-auto">
          <img onClick={handleOnClose} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/>
          <form>
            <h1 className="font-header card-sm:text-2xl">team name</h1>
              <input
              name='newTeamName'
              className="rounded-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
              defaultValue={team.name}
              />
            <h1 className="font-header card-sm:text-2xl">Select A Leader</h1>
            <div className="flex flex-wrap w-full p-2 justify-around bg-orange-100 border-4 border-black rounded-lg">
            {team.characters.map((individualCharacter => (
              <CharacterLeaderSelect team={team} individualCharacter={individualCharacter} name="leaderSelect" label={individualCharacter.id}/>   
            )))}
            </div>
            <h1 className="font-header card-sm:text-2xl">Select A Sub-Leader</h1>
            <div className="flex flex-wrap w-full p-2 justify-around bg-orange-100 border-4 border-black rounded-lg">
            {team.characters.map((individualCharacter => (
              <CharacterSubLeaderSelect team={team} individualCharacter={individualCharacter} name="subLeaderSelect" label={individualCharacter.id}/>   
            )))}
            </div>
            <h1 className="font-header card-sm:text-2xl">Select Your First Rotation</h1>
            <div className="flex flex-wrap w-full p-2 justify-around bg-orange-100 border-4 border-black rounded-lg">
            {team.characters.map((individualCharacter => (
              <Rotation1CharacterSelection individualCharacter={individualCharacter} label={individualCharacter.id} rotation1Characters={rotation1Characters} handleRotation1Characters={handleRotation1Characters}/>   
            )))}
            </div>
            <h1 className="font-header card-sm:text-2xl">Select Your Second Rotation</h1>
            <div className="flex flex-wrap w-full p-2 justify-around bg-orange-100 border-4 border-black rounded-lg">
            {team.characters.map((individualCharacter => (
              <Rotation2CharacterSelection individualCharacter={individualCharacter} label={individualCharacter.id} rotation2Characters={rotation2Characters} handleRotation2Characters={handleRotation2Characters}/>   
            )))}
            </div>
            <h1 className="font-header card-sm:text-2xl">What is your strategy/tactic for this team?</h1>
            <div className="flex justify-center">
              <div className="mb-3 w-full">
                <textarea
                  name='strategy'
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-4 border-dashed border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-solid focus:outline-none"
                  rows="4"
                  defaultValue={team.info.notes}
                ></textarea>
              </div>
            </div>
            <div className="flex w-full mb-4 justify-center items-center">
              <p className="text-2xl font-bold text-red-500">{errorMessage}</p>
            </div>
            <div className="flex w-full justify-center items-center">
              <button onClick={(e) => handleFormSubmit(e)} className="flex w-fit p-2 justify-center border-4 border-black text-xl font-bold items-center text-center bg-orange-400 hover:bg-orange-500 transition ease-in-out">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("EditTeamForm")
  );
}

const CharacterLeaderSelect = ({ team, individualCharacter, name, label, ...inputProps }) => {
  const previousLeader = team.info.leader
  return (
    <label htmlFor={`${name}-${label}`}>
      <input
        type="radio"
        name={name}
        id={`${name}-${label}`}
        className="hidden peer"
        value={label}
        {...inputProps}
        defaultChecked={label === previousLeader}
      />
      <div
        style={{ cursor: "pointer" }}
        className="w-fit relative lg:hover:bg-slate-900/[.4] peer-checked:bg-amber-900/[.75] lg:hover:peer-checked:bg-amber-900/[.9]"
      >
        <CharacterCard individualCharacter={individualCharacter}/>
      </div>
    </label>
  );
};

const CharacterSubLeaderSelect = ({ team, individualCharacter, name, label, ...inputProps }) => {
  const previousSubLeader = team.info.subLeader
  return (
    <label htmlFor={`${name}-${label}`}>
      <input
        type="radio"
        name={name}
        id={`${name}-${label}`}
        className="hidden peer"
        value={label}
        {...inputProps}
        defaultChecked={label === previousSubLeader}
      />
      <div
        style={{ cursor: "pointer" }}
        className="w-fit relative lg:hover:bg-slate-900/[.4] peer-checked:bg-amber-900/[.75] lg:hover:peer-checked:bg-amber-900/[.9]"
      >
        <CharacterCard individualCharacter={individualCharacter}/>
      </div>
    </label>
  );
};

const Rotation1CharacterSelection = ({ individualCharacter, label, rotation1Characters, handleRotation1Characters }) => {
  let isRotationCharacters = rotation1Characters.includes(label)
  return (
    <div 
    onClick={() => handleRotation1Characters(label)}
    style={{ cursor: "pointer" }}
    className={`w-fit relative
    ${isRotationCharacters ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
        <CharacterCard individualCharacter={individualCharacter}/>
      </div>
  );
};

const Rotation2CharacterSelection = ({ individualCharacter, label, rotation2Characters, handleRotation2Characters }) => {
  let isRotationCharacters = rotation2Characters.includes(label)
  return (
    <div 
    onClick={() => handleRotation2Characters(label)}
    style={{ cursor: "pointer" }}
    className={`w-fit relative
    ${isRotationCharacters ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : 'hover:bg-slate-900/[.4]'}`}>
        <CharacterCard individualCharacter={individualCharacter}/>
      </div>
  );
};

const CharacterCard = ({individualCharacter}) => {
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
            className="h-[50px] card-sm:h-[100px] w-[50px] card-sm:w-[100px] bg-no-repeat relative z-50 top-[10%] card-sm:top-[0%] right-[2%] card-sm:right-[0%]"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[16px] card-sm:h-[25px] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[19px] card-sm:h-[34px] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[24px] card-sm:w-[40px] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
            cldImg={characterTypeBadge}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
        </div>
    </>
  );
}