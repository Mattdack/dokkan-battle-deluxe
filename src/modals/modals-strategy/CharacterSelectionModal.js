import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";

import CharacterCard from "../../cards/ServerCharacterCard";
import SearchForm from "../../components/SearchForm";

import * as sort from "../../util/sorting";

export default function CharacterSelectionModal( {characterDictionary, userData, handleCharacterSelection, open, onClose} ) {

  const allCharacters = Object.keys(characterDictionary).map(key => {
    const value = characterDictionary[key];
    return {
      ...value,
      id: key,
    };
  })
  
  const userCharacterIds = userData?.savedCharacters
  const userCharacterObjects = userCharacterIds.map(characterId => characterDictionary[characterId])
  
  const [filteredCharacters, setFilteredCharacters] = useState(null)
  const [viewableCharacters, setViewableCharacters] = useState(75);
  const [newFilterData, setNewFilterData] = useState({})

  const filterAndSetCharacters = (filterData) => [setFilteredCharacters(getFilteredCharacters(allCharacters, userCharacterObjects, filterData, selectedCategories)),setNewFilterData(filterData)]

  //TODO: can be optimized/look cleaner if this sort/filter was a util function
  //this seems complex but isn't when broken down. First, it starts with charactersToDisplay and sets it equal to filteredCharacters. However, if filteredCharacters (anything in the form is filled out) is null then look for the state of the filter and filter based on that
  const [filterByGame, setFilterByGame] = useState(true);

  const charactersToDisplay = sort.sortCharacters(allCharacters, filteredCharacters, filterByGame)

  const characterSelectContainerRef = useRef(null)

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleNewCategorySelected = (e) => {
    setViewableCharacters(50)
    if(e.target.value === ''){
      setSelectedCategories([])
    }
    if(selectedCategories.includes(e.target.value)){
      return selectedCategories
    }else{
      setSelectedCategories([...selectedCategories, e.target.value])
    }
    characterSelectContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSelectedCategoryRemoval = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter(singleCategory => singleCategory !== categoryToRemove))
  }

  useEffect(() => {
    if(characterSelectContainerRef.current !== null){
      const cardContainer = characterSelectContainerRef.current;
  
      const handleScroll = () => {
        if ((cardContainer.scrollTop + cardContainer.clientHeight) >= (cardContainer.scrollHeight - 240)) {
          setViewableCharacters(viewableCharacters + 50);
        }
      };
  
      cardContainer.addEventListener("scroll", handleScroll);
  
      return () => {
        cardContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open && viewableCharacters]);

  //this useEffect allows the filtered characters to be "automatically" loaded when ever the selected categories change
  useEffect(() => {
    const filteredChars = getFilteredCharacters(allCharacters, userCharacterObjects, newFilterData, selectedCategories);
    setFilteredCharacters(filteredChars)
  }, [selectedCategories])

  // this useEffect sets all the form data to null besides the selected category state (helps selecting people more)
  useEffect(() => {
    setNewFilterData({})
    const filteredChars = getFilteredCharacters(allCharacters, userCharacterObjects, newFilterData, selectedCategories);
    setFilteredCharacters(filteredChars)
  }, [open])
  
  if (!open) return null;

  return ReactDom.createPortal(
    <div 
    onClick={onClose}
    className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] lg:w-4/5 h-[90vh] lg:max-h-3/4 px-5 logo-md:px-10 py-4 border-4 border-black rounded-lg shadow-lg fixed bg-orange-200 z-[1000] overflow-y-auto">
        <p className="font-header w-full text-2xl lg:text-4xl text-center justify-center items-center underline underline-offset-8">Character Selection</p>
        <div className="flex pt-2 pb-2 items-center justify-center">
          <span className="mr-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-light">
            Game Filter
          </span>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!filterByGame}
              readOnly
            />
            <div
              onClick={() => {setFilterByGame(!filterByGame)}}
              className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[24%] card-sm:after:top-[15%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
            ></div>
            <div className="ml-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-light">
              Release Date
            </div>
          </label>
        </div>

        {/* //contains filters/buttons/search field/etc. */}

        <SearchForm
          onFormChange={filterAndSetCharacters}
          selectedCategories={selectedCategories}
          handleNewCategorySelected={handleNewCategorySelected}
          handleSelectedCategoryRemoval={handleSelectedCategoryRemoval}
        />

        {/* //character select box */}
        <div
        id='characterSelectContainerRef' 
        ref={characterSelectContainerRef}
        className="characterContainer flex flex-wrap h-[48vh] card-sm:h-[40vh] justify-around items-center p-1 mx-1 lg:mx-2 mt-2 lg:mt-3 lg:mb-4 border-2 border-slate-900 min-h-0 relative overflow-y-auto bg-orange-100">
           
          {charactersToDisplay
              .slice(0, viewableCharacters)
              .map((character) => (
                <div 
                onClick={() => handleCharacterSelection(character)}
                className='px-[.5%] hover:bg-amber-600'
                key={'div'+character.id}
                >
                  <CharacterCard key={character.id} individualCharacter={character} mobileSize={'60px'} desktopSize={'85px'}/>
                </div>
              ))
          }
        </div>
      </div>
    </div>,document.getElementById("CharacterSelectionModal")
  )
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = (allCharacters, userCharacters, filterData, selectedCategories) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters;
  return baseChars.filter((character) => {
    return (
      (!selectedCategories.length || (filterData.matchAllCategories
        ? selectedCategories.every(category => character.category.includes(category))
        : selectedCategories.some(category => character.category.includes(category))
      )) &&
      (!filterData.searchTerm || character.name.toLowerCase().includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterType || character.type.includes(filterData.characterType)) &&
      (!filterData.characterSuperOrExtreme || character.type.slice(0, 1).includes(filterData.characterSuperOrExtreme)) &&
      (!filterData.characterRarity ||filterData.characterRarity === character.rarity)
    );
  });
};