import React, { useState, useEffect, useRef } from "react";

import Web from "./Web";
import SuggestForm from "./SuggestForm";
import SuggestCard from "../cards/SuggestCard";
import CharacterCard from "../cards/CharacterCard";

import { findCharacterLeaderCategories } from "../util/allCategories";
import { add, countBy, groupBy } from "lodash";
import * as characterStyling from "../util/characterCardStyling";
import * as linkSkillInfo from "../util/linkSkillInfo"

function SuggestToWeb({ allCharacters, selectedCharacter, userCharacters, handleNewDetails, webOfTeam,  addToWebOfTeam, removeFromWebOfTeam, allCharactersLoading }) {
  // these allow the selected options in the SuggestForm to be passed into the SuggestCards
  const [statsSelectedOptions, setStatsSelectedOptions] = useState("None");

  const handleStatsSelectedOptions = (event) => {
    suggestedCardContainer.current.scrollTo({ top: 0, behavior: "smooth" })
    setViewableCharacters(50)
    setStatsSelectedOptions(event.target.value);
  };

  const selectedLinks = selectedCharacter.link_skill;

  const linkedCharacters = allCharacters.filter(character => {
    const characterLinks = character.link_skill;
    return characterLinks.some(link => selectedLinks.includes(link));
  });

  //TODO: this is making a function with filterData passed in, then setting the state for filtered characters to the filterData
  const [filteredSuggestedCharacters, setFilteredSuggestedCharacters] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [newFilterData, setNewFilterData] = useState({})

  // this function allows for filtered characters to be set to the reults of the getFilteredCharacters (which is extracted from the search form)
  const filterAndSetSuggestedCharacters = (filterData) => [setFilteredSuggestedCharacters(getFilteredCharacters(linkedCharacters, userCharacters, filterData, selectedCategories)),setNewFilterData(filterData)]

  const handleNewCategorySelected = (e) => {
    // setViewableCharacters(100)
    if(e.target.value === ''){
      suggestedCardContainer.current.scrollTo({ top: 0, behavior: "smooth" })
      setViewableCharacters(50)
      return setSelectedCategories([])
    }else if(selectedCategories.includes(e.target.value)){
      return selectedCategories
    }else{
      suggestedCardContainer.current.scrollTo({ top: 0, behavior: "smooth" })
      setViewableCharacters(50)
      return setSelectedCategories([...selectedCategories, e.target.value])
    }
  }
  
  const handleSelectedCategoryRemoval = (categoryToRemove) => {
    if(categoryToRemove === 'Remove All Categories'){
      suggestedCardContainer.current.scrollTo({ top: 0, behavior: "smooth" })
      setViewableCharacters(50)
      return setSelectedCategories([])
    }
    setViewableCharacters(50)
    setSelectedCategories(selectedCategories.filter(singleCategory => singleCategory !== categoryToRemove))
  }
  
  //This useEffect allows for filtered characters to refresh AFTER a category is added or removed
  useEffect(() => {
    const filteredChars = getFilteredCharacters(allCharacters, userCharacters, newFilterData, selectedCategories);
    setFilteredSuggestedCharacters(filteredChars);
  }, [selectedCategories]); 

  //TODO: this is then the array of arrays (characters paired by how many links match) 
  const charactersWithMatchedLinks = groupCharactersByLinkCount(filteredSuggestedCharacters, selectedCharacter.link_skill);

  const [showSuggestedCards, setShowSuggestedCards] = useState(false)
  function handleSetShowSuggestedCards () {
    setViewableCharacters(50)
    setShowSuggestedCards(!showSuggestedCards)
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const [viewableCharacters, setViewableCharacters] = useState(100);
  
  const suggestedCardContainer = useRef(null)
  // this useEffect is for automatically loading characters by increasing the viewableCharacters
  useEffect(() => {
    if(suggestedCardContainer.current !== null){
      if((viewableCharacters >= filteredSuggestedCharacters.length) || (viewableCharacters >= linkedCharacters.length)){
        return
      }
      const cardContainer = suggestedCardContainer.current;
  
      const handleScroll = () => {
        if ((cardContainer.scrollTop + cardContainer.clientHeight) >= (cardContainer.scrollHeight - 100)) {
          setViewableCharacters(viewableCharacters + 100);
        }
      };
  
      cardContainer.addEventListener("scroll", handleScroll);
  
      return () => {
        cardContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [allCharactersLoading, selectedCharacter, viewableCharacters]);
  
  useEffect(() => {
    if(suggestedCardContainer.current){
      suggestedCardContainer.current.scrollTo({ top: 0, behavior: "smooth" })
      setViewableCharacters(100)
    }
  },[selectedCharacter])

  return (
    <div className={`flex flex-col flex-1 ${showSuggestedCards ? 'h-1/2' : 'h-full'}`}>
      <Web 
      webOfTeam={webOfTeam} 
      removeFromWebOfTeam={removeFromWebOfTeam} 
      allCharactersLoading={allCharactersLoading} 
      selectedCharacter={selectedCharacter}
      charactersWithMatchedLinks={charactersWithMatchedLinks}
      handleNewDetails={handleNewDetails}
      addToWebOfTeam={addToWebOfTeam}
      statsSelectedOptions={statsSelectedOptions}
      showSuggestedCards={showSuggestedCards}
      handleSetShowSuggestedCards={handleSetShowSuggestedCards}
      />

    <div className={`flex flex-col ${showSuggestedCards ? (windowWidth < 850 ? 'h-3/4': 'h-[55%]') : 'hidden'}`}>

        {/* <SuggestTeam allCharacters={allCharacters} selectedCharacter={selectedCharacter} linkedCharacters={linkedCharacters} userCharacters={userCharacters}/> */}

        <div className="flex justify-around items-center">

          <div className="px-1">
              <CharacterCard individualCharacter={selectedCharacter} mobileSize={'90px'} desktopSize={'85px'}/>
          </div>

          <SuggestForm 
          onFormChange={filterAndSetSuggestedCharacters}
          selectedCategories={selectedCategories}
          handleNewCategorySelected={handleNewCategorySelected}
          handleSelectedCategoryRemoval={handleSelectedCategoryRemoval}
          statsSelectedOptions={statsSelectedOptions}
          setStatsSelectedOptions={setStatsSelectedOptions}
          handleStatsSelectedOptions={handleStatsSelectedOptions}
          allCharactersLoading={allCharactersLoading}
          />
        </div>
        
        <div 
        ref={suggestedCardContainer}
        className={`flex-1 overflow-y-auto`}>

          <OrderByStatsBuffed showSuggestedCards={showSuggestedCards} webOfTeam={webOfTeam} handleNewDetails={handleNewDetails} addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} statsSelectedOptions={statsSelectedOptions} selectedCharacter={selectedCharacter} linkedCharacters={filteredSuggestedCharacters} viewableCharacters={viewableCharacters}/>

            {/* <CharacterLinkDisplay matchCount={7} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam} statsSelectedOptions={statsSelectedOptions} />
            <CharacterLinkDisplay matchCount={6} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/>
            <CharacterLinkDisplay matchCount={5} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/>
            <CharacterLinkDisplay matchCount={4} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/>
            <CharacterLinkDisplay matchCount={3} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/>
            <CharacterLinkDisplay matchCount={2} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/>
            <CharacterLinkDisplay matchCount={1} webOfTeam={webOfTeam} selectedCharacter={selectedCharacter} charactersWithMatchedLinks={charactersWithMatchedLinks} handleNewDetails={handleNewDetails}  addToWebOfTeam={addToWebOfTeam} removeFromWebOfTeam={removeFromWebOfTeam}  statsSelectedOptions={statsSelectedOptions}/> */}
        </div>
      </div>
    </div>
  );
}

const OrderByStatsBuffed = ({ showSuggestedCards, webOfTeam, handleNewDetails, addToWebOfTeam, removeFromWebOfTeam, statsSelectedOptions, selectedCharacter, linkedCharacters, viewableCharacters}) => {
  if(!showSuggestedCards){
    return null
  }

  const characterArrayWithStats = linkedCharacters.map(linkedCharacter => {
    const linkSkillStatsBoosted = linkSkillInfo.linkSkillStatsBoostedFor2Characters_lvl_1(selectedCharacter, linkedCharacter);
    const characterStats = {
      id: linkedCharacter.id,
      ATK: linkSkillStatsBoosted.linkAccumulation.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      DEF: linkSkillStatsBoosted.linkAccumulation.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      Ki: linkSkillStatsBoosted.linkAccumulation.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    };
    return {...linkedCharacter, ...characterStats};
  });

  // Define a comparison function that compares characters based on the sort key
  const compareFunction = (a, b) => {
    if(statsSelectedOptions === 'None'){
      return b.id - a.id
    } else{
      return b[statsSelectedOptions] - a[statsSelectedOptions]
    }
  }

  // Sort the array based on the comparison function
  characterArrayWithStats.sort(compareFunction);

  return(
    <div className="p-2">
    <div className="flex flex-wrap min-h-[95px] max-h-fit card-sm:min-h-[95px] card-sm:max-h-fit justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 relative">
      {characterArrayWithStats
      .slice(0, viewableCharacters)
      .filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id)
      .map(character => (
        <div 
        id='CharacterCard'
        key={'suggest' + character.id.toString()}
        >
          <SuggestCard
            character={character}
            webOfTeam={webOfTeam}
            selectedCharacter={selectedCharacter}
            handleNewDetails={handleNewDetails}
            removeFromWebOfTeam={removeFromWebOfTeam}
            addToWebOfTeam={addToWebOfTeam}
            statsSelectedOptions={statsSelectedOptions}
          />
        </div>
      ))}
    </div>
    </div>
  )
}

function groupCharactersByLinkCount(otherCharacters, selectedCharacterLinks,) {
  return groupBy(otherCharacters, (character) => {
    // result is { true: includesCount, false: missingCount }
    const result = countBy(character.link_skill || [], (linkSkill) => selectedCharacterLinks.includes(linkSkill));
    return result.true;
  });
}

const getFilteredCharacters = (linkedCharacters, userCharacters, filterData, selectedCategories) => {
  const baseChars = filterData.isUserDeckSuggest ? userCharacters : linkedCharacters;
  return baseChars.filter((character) => {
    return (
      (!selectedCategories.length || (filterData.suggestMatchAllCategories
        ? selectedCategories.every(category => character.category.includes(category))
        : selectedCategories.some(category => character.category.includes(category))
      )) &&
      (!filterData.characterTypeSuggest || character.type.includes(filterData.characterTypeSuggest))
    );
  });
};

// this first conditional render checks to see if there are characters with matched links, then under the specific # of links matched, it filters out characters with the same name and ID, if there are no characters, then nothing is appended to the page
// const CharacterLinkDisplay = ({matchCount, webOfTeam, selectedCharacter, charactersWithMatchedLinks, handleNewDetails, addToWebOfTeam, removeFromWebOfTeam, statsSelectedOptions,}) => {
//   return (
//     <>
//     {charactersWithMatchedLinks && charactersWithMatchedLinks[matchCount] && charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).length > 0 ? 
//     <>
//       <h3 className="h-fit py-2 font-header text-center text-md card-sm:text-xl font-light underline decoration-2 underline-offset-4">Characters with {matchCount} Links</h3>
//       <div className="flex flex-wrap min-h-[95px] max-h-fit card-sm:min-h-[95px] card-sm:max-h-fit justify-evenly bg-orange-100 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto relative">
//         {charactersWithMatchedLinks[matchCount].filter((character) => character.name !== selectedCharacter.name && character.id !== selectedCharacter.id).map((character) => (
//           <div 
//           id='CharacterCard'
//           key={'suggest' + character.id.toString()}
//           >
//             <SuggestCard
//               character={character}
//               webOfTeam={webOfTeam}
//               selectedCharacter={selectedCharacter}
//               handleNewDetails={handleNewDetails}
//               removeFromWebOfTeam={removeFromWebOfTeam}
//               addToWebOfTeam={addToWebOfTeam}
//               statsSelectedOptions={statsSelectedOptions}
//             />
//           </div>
//         ))}
//       </div>
//     </>
//     : null
//     }
//     </>
//   );
// }


// const SuggestTeam = ({ allCharacters, selectedCharacter, linkedCharacters, userCharacters }) => {
  //   const characterLeadCategories = findCharacterLeaderCategories(selectedCharacter)
  //   //TODO: find characters under those categories - ALL, then one and two
  //   const linkedCharacterWithBothCategory = linkedCharacters.filter(character =>
  //     characterLeadCategories.some(category =>
  //       character.category.includes(category)
  //     )
  //   );
  //   const linkedCharactersWithFirstCategory = linkedCharacters.filter(character =>
  //     character.category.includes(characterLeadCategories[0])
  //   );
  //   const linkedCharactersWithSecondCategory = linkedCharacters.filter(character =>
  //     character.category.includes(characterLeadCategories[1])
  //   );
  //   console.log(linkedCharacterWithBothCategory)
  //   console.log(linkedCharactersWithFirstCategory)
  //   console.log(linkedCharactersWithSecondCategory)
  
  //   //TODO: find user characters with those characters
  //   const linkedCharacterWithCategoryAndUser = linkedCharacterWithBothCategory.filter(character =>
  //     userCharacters.some(userCharacter =>
  //       character.id === userCharacter.id
  //     )
  //   );  
  //   //TODO: find the amount of links between the user characters that are in categories
  //   const charactersMatchedLinks = groupCharactersByLinkCount(linkedCharacterWithCategoryAndUser, selectedCharacter.link_skill)
    
  //   //TODO: team with same categories and high links
  //   const sameLeaderTeam = [];
  //   for (let i = 7; i >= 1 && sameLeaderTeam.length < 5; i--) {
  //     const characters = charactersMatchedLinks[i];
  //     if (Array.isArray(characters)) {
  //       for (const character of characters) {
  //         if (character.id !== selectedCharacter.id && character.name !== selectedCharacter.name) {
  //           sameLeaderTeam.push(character);
  //           if (sameLeaderTeam.length >= 5) {
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  
  //   //TODO: teams with different leaders
  //   const allOtherLeaders = allCharacters.filter(character => {
  //     const characterLeaderSkill = character.ls_description.split(';');
  //     return characterLeaderSkill.some(leaderSkill => {
  //       return characterLeadCategories.some(category => {
  //         return leaderSkill.includes(category)
  //       });
  //     }) && character.id !== selectedCharacter.id;
  //   })
  //   const usersOtherLeaders = userCharacters.filter(character => {
  //     const characterLeaderSkill = character.ls_description.split(';');
  //     return characterLeaderSkill.some(leaderSkill => {
  //       return characterLeadCategories.some(category => {
  //         return leaderSkill.includes(category)
  //       });
  //     }) && character.id !== selectedCharacter.id;
  //   })
  
  //   return(
  //     <div className="flex flex-row bg-red-500">
  //       <CharacterCard individualCharacter={selectedCharacter} mobileSize={'60px'} desktopSize={'80px'}/>
  //       {sameLeaderTeam && sameLeaderTeam.map(character =>
  //         <CharacterCard key={'suggested-team'+character.id} individualCharacter={character} mobileSize={'60px'} desktopSize={'80px'}/>
  //       )}
  //     </div>
  //   )
  // }

export default SuggestToWeb;
