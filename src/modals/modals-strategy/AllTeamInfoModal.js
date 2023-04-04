import React, { memo } from "react";
import ReactDom from "react-dom";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
const hiddenPotentialIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/hidden-potential.png";
const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";


export default function AllTeamInfo({  team, characterDictionary, open, onClose }) {
  if (!open) return null;

  const rotationIds = [...team.rotation1, ...team.rotation2];
  //set entire float to team array of ids
  let floaterIds = [...team.teamArray]
  for (let i = 0; i < rotationIds.length; i++) {
    const index = floaterIds.indexOf(rotationIds[i]);
    //remove the rotation characters to have the 3 left over characters
    if (index > -1) {
      floaterIds.splice(index, 1);
    }
  }
  
  const teamArrayWithCharacterData = [team.character1, team.character2, team.character3, team.character4, team.character5, team.character6, team.character7]

  const ezaDictionary = Object.fromEntries(teamArrayWithCharacterData.map((characterData) => [characterData.characterId, characterData.EZA]));


  return ReactDom.createPortal(
    <div 
    onClick={onClose}
    className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
      <div 
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] lg:w-2/5 lg:min-w-[600px] h-[75vh] py-4 border-8 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[1000] overflow-y-auto">
        
        <div className="flex flex-col w-full mb-6 justify-center items-center">
          <p className="font-header w-[80%] text-xl card-sm:text-3xl text-center">{team.name}</p>
          <p className="w-[80%] pb-2 text-base card-sm:text-2xl font-bold text-center truncate">creator: {team.creator.username.replace(/(.+)@.+\..+/, "$1")}</p>
          {team.mission === 'No Mission' ? null : <p className="w-[80%] pb-2 text-md card-sm:text-lg font-bold text-center">Mission: {team.mission}</p>}
          <div className="w-[80%] border-b-black border-b-4"></div>
        </div>

        <div className="flex flex-wrap w-full justify-around">

          <div className="flex flex-col justify-center items-center">

            <p className="font-header text-base card-sm:text-xl">Leader:</p>
            <CharacterCard individualCharacter={characterDictionary[team.leader]} EZA={ezaDictionary[team.leader]} leaderOrSubLeader='leader'/>
            <p className="font-header text-base card-sm:text-xl">Sub Leader:</p>
            <CharacterCard individualCharacter={characterDictionary[team.subLeader]} EZA={ezaDictionary[team.subLeader]} leaderOrSubLeader='subLeader'/>
            
          </div>

          <div className="justify-center items-center">

            <div className="flex flex-col">
              <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 1:</p>
              <div className="flex justify-center w-full">
                <CharacterCard individualCharacter={characterDictionary[team.character1.characterId]} EZA={ezaDictionary[team.character1.characterId]} leaderOrSubLeader={team.character1.leaderOrSubLeader}/>
                <CharacterCard individualCharacter={characterDictionary[team.character2.characterId]} EZA={ezaDictionary[team.character2.characterId]} leaderOrSubLeader={team.character2.leaderOrSubLeader}/>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-header w-full text-center text-base card-sm:text-xl">Rotation 2:</p>
              <div className="flex justify-center w-full">
              <CharacterCard individualCharacter={characterDictionary[team.character3.characterId]} EZA={ezaDictionary[team.character3.characterId]} leaderOrSubLeader={team.character3.leaderOrSubLeader}/>
              <CharacterCard individualCharacter={characterDictionary[team.character4.characterId]} EZA={ezaDictionary[team.character4.characterId]} leaderOrSubLeader={team.character4.leaderOrSubLeader}/>
              </div>
            </div>

          </div>

        </div>

        <div className="flex flex-col lg:flex-row w-full pt-4 justify-center items-center">
          <p className="font-header flex mr-4 justify-around text-base card-sm:text-xl">Float:</p>
          <div className="flex flex-wrap justify-center">
            <CharacterCard individualCharacter={characterDictionary[team.character5.characterId]} EZA={ezaDictionary[team.character5.characterId]} leaderOrSubLeader={team.character5.leaderOrSubLeader}/>
            <CharacterCard individualCharacter={characterDictionary[team.character6.characterId]} EZA={ezaDictionary[team.character6.characterId]} leaderOrSubLeader={team.character6.leaderOrSubLeader}/>
            <CharacterCard individualCharacter={characterDictionary[team.character7.characterId]} EZA={ezaDictionary[team.character7.characterId]} leaderOrSubLeader={team.character7.leaderOrSubLeader}/>
          </div>

        </div>

        <div className="flex flex-row w-full justify-center items-center">
          <p className="font-header flex mr-4 justify-around text-base card-sm:text-xl">Items:</p>
          
          {(team.items.length === 0 || team.items[0].id === 0) ?
          <div className="flex flex-row p-2">
          <ItemCard item={{id:0, type:'bronze'}}/>
          <ItemCard item={{id:0, type:'bronze'}}/>
          <ItemCard item={{id:0, type:'bronze'}}/>
          <ItemCard item={{id:0, type:'bronze'}}/>
          </div>
          :
          <div className="flex flex-row p-2">
            {team.items && team.items.map((item) => (
              <ItemCard item={item} key={item.id}/>
            ))}
          </div>
          }
        </div>

        <div className="flex flex-row w-full mb-4 justify-center items-center">
          <p className="font-header flex mr-4 justify-around text-base card-sm:text-xl">Support Memory:</p>
          {team.supportMemory ? 
          <SupportMemoryCard supportMemory={team.supportMemory}/>
          :
          <SupportMemoryCard supportMemory={{id:0}}/>
          }
        </div>

        <div className="h-full w-full border-t-4 border-black">
          <CharacterBar singleCharacter={team.character1} characterDictionary={characterDictionary} leaderOrSubLeader={team.character1.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character2} characterDictionary={characterDictionary} leaderOrSubLeader={team.character2.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character3} characterDictionary={characterDictionary} leaderOrSubLeader={team.character3.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character4} characterDictionary={characterDictionary} leaderOrSubLeader={team.character4.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character5} characterDictionary={characterDictionary} leaderOrSubLeader={team.character5.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character6} characterDictionary={characterDictionary} leaderOrSubLeader={team.character6.leaderOrSubLeader}/>
          <CharacterBar singleCharacter={team.character7} characterDictionary={characterDictionary} leaderOrSubLeader={team.character7.leaderOrSubLeader}/>

        <div className="flex flex-col w-full pb-10 justify-center items-center">
          <p className="font-header flex mr-4 justify-around text-base card-sm:text-xl">Team Strategy:</p>
          <p className="p-4 lg:text-lg font-bold">
            {team.strategy}
          </p>
        </div>
        </div>
      </div>
    </div>,document.getElementById("AllTeamInfoModal")
  );
};

function CharacterBar({ singleCharacter, characterDictionary, leaderOrSubLeader }){
  return (
  <div className="flex flex-row w-full h-[17vh] items-center border-b-4 border-black bg-orange-200">
    <div className="flex flex-col w-fit h-full justify-center items-center border-r-2 border-black">
      <div className="p-2">
        <CharacterCard individualCharacter={characterDictionary[singleCharacter?.characterId]} leaderOrSubLeader={leaderOrSubLeader} EZA={singleCharacter.EZA}/>
      </div>
      <div className="flex w-full border-black">
          <div 
          className={`grayscale inline-flex items-center justify-between w-full p-1 grayscale ${singleCharacter?.hiddenPotential?.hiddenPotential1 ? 'grayscale-0' : ''}`}>                           
            <img src={hiddenPotentialIcon} className="w-full"/>
          </div>
          <div 
          className={`grayscale inline-flex items-center justify-between w-full p-1 grayscale ${singleCharacter?.hiddenPotential?.hiddenPotential2 ? 'grayscale-0' : ''}`}>                           
            <img src={hiddenPotentialIcon} className="w-full"/>
          </div>
          <div 
          className={`grayscale inline-flex items-center justify-between w-full p-1 grayscale ${singleCharacter?.hiddenPotential?.hiddenPotential3 ? 'grayscale-0' : ''}`}>                           
            <img src={hiddenPotentialIcon} className="w-full"/>
          </div>
          <div 
          className={`grayscale inline-flex items-center justify-between w-full p-1 grayscale ${singleCharacter?.hiddenPotential?.hiddenPotential4 ? 'grayscale-0' : ''}`}>                           
            <img src={hiddenPotentialIcon} className="w-full"/>
          </div>            
      </div>
    </div>

    <div className="flex flex-col h-full w-full justify-center items-center text-center bg-orange-300">
      <div className="flex flex-col w-full h-full p-2 flex-grow">
        <p className="flex font-header justify-center text-lg logo-md:text-lg border-b-2 border-black">
          Character Strategy:
        </p>
        <p className="flex h-full text-sm lg:text-base font-bold overflow-y-auto">
          {singleCharacter?.info}
        </p>
      </div>
    </div>
  </div>
  )
}

const CharacterCard = ({individualCharacter, leaderOrSubLeader, EZA}) => {
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
            className="h-[80px] card-sm:h-[100px] bg-no-repeat relative z-40"
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
                : "h-[35%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[81%] absolute top-[13%] z-0"
            cldImg={characterTypeBackground}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[45%] card-sm:w-[40%] absolute -top-[4%] card-sm:top-[0%] right-[-6%] card-sm:right-[-2%] z-50"
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
        <div className='w-fit relative mx-1'>
          <AdvancedImage
            className="h-[40px] card-sm:h-[60px] w-[40px] card-sm:w-[60px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
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
            className={`w-[60px] card-sm:w-[80px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40`}
            cldImg={supportMemoryThumb}
            alt={supportMemory.name}
            plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
        </div>
    </>
  );
}