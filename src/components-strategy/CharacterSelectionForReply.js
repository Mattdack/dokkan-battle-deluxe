import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

import SearchFormForReply from "./SearchFormForReply";

function CharacterSelectionForReply( {characterDictionary, username, usersSavedCharacterIds, handleCommentCharacterSelection, characterSelection} ) {
  const allCharacters = usersSavedCharacterIds.map(id => {
    const value = characterDictionary[id];
    return {
      ...value,
      id: id,
    };
  });

  const [filteredCharacters, setFilteredCharacters] = useState(null)
  const [viewableCharacters, setViewableCharacters] = useState(75);
  const [newFilterData, setNewFilterData] = useState({})

  const filterAndSetCharacters = (filterData) => [setFilteredCharacters(getFilteredCharacters(allCharacters, filterData, selectedCategories)),setNewFilterData(filterData)]

  //TODO: can be optimized/look cleaner if this sort/filter was a util function
  //this seems complex but isn't when broken down. First, it starts with charactersToDisplay and sets it equal to filteredCharacters. However, if filteredCharacters (anything in the form is filled out) is null then look for the state of the filter and filter based on that
  const [filterByGame, setFilterByGame] = useState(true);
  const charactersToDisplay = filteredCharacters === null ? filterByGame ? allCharacters.slice().sort((a, b) => {
            const typeOrder = ["EAGL", "SAGL", "ETEQ", "STEQ", "EINT", "SINT", "ESTR", "SSTR", "EPHY", "SPHY",]
            const rarityOrder = ["UR", "LR"];

            const rarityA = rarityOrder.indexOf(a.rarity);
            const rarityB = rarityOrder.indexOf(b.rarity);
            if (rarityA === rarityB) {
              const typeA = typeOrder.indexOf(a.type);
              const typeB = typeOrder.indexOf(b.type);
              if (typeA === typeB) {
                const dateA = new Date(a.glb_date).getTime();
                const dateB = new Date(b.glb_date).getTime();
                return dateB - dateA;
              }
              return typeB - typeA;
            }
            return rarityB - rarityA;
          })
        : allCharacters.slice().sort((a, b) => {
            if (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime() === 0) {
              return b.id - a.id;
            }
            return (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime());
          })
      : // This is now starting the FILTERED characters (if filter form is filled out)
      filterByGame
      ? filteredCharacters.slice().sort((a, b) => {
          const typeOrder = ["EAGL","SAGL","ETEQ","STEQ","EINT","SINT","ESTR","SSTR","EPHY","SPHY",];
          const rarityOrder = ["UR", "LR"];

          const rarityA = rarityOrder.indexOf(a.rarity);
          const rarityB = rarityOrder.indexOf(b.rarity);
          if (rarityA === rarityB) {
            const typeA = typeOrder.indexOf(a.type);
            const typeB = typeOrder.indexOf(b.type);
            if (typeA === typeB) {
              const dateA = new Date(a.glb_date).getTime();
              const dateB = new Date(b.glb_date).getTime();
              return dateB - dateA;
            }
            return typeB - typeA;
          }
          return rarityB - rarityA;
        })
      : filteredCharacters.slice().sort((a, b) => {
          if (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime() === 0) {
            return b.id - a.id;
          }
          return (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime());
        });

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
    }, [viewableCharacters]);

    //this useEffect allows the filtered characters to be "automatically" loaded when ever the selected categories change
    useEffect(() => {
      const filteredChars = getFilteredCharacters(allCharacters, newFilterData, selectedCategories);
      setFilteredCharacters(filteredChars)
    }, [selectedCategories])

    // this useEffect sets all the form data to null besides the selected category state (helps selecting people more)
    useEffect(() => {
      setNewFilterData({})
      const filteredChars = getFilteredCharacters(allCharacters, newFilterData, selectedCategories);
      setFilteredCharacters(filteredChars)
    }, [])
    
  return (
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full py-2 border-4 border-black rounded-lg shadow-lg bg-orange-200 overflow-y-auto">
        <p className="font-header w-full pb-2 text-lg lg:text-xl text-center justify-center items-center underline underline-offset-8">{username}'s Characters</p>

        {/* <div className="flex pt-2 pb-2 items-center justify-center">
          <span className="flex h-fit mr-4 text-md card-sm:text-lg font-bold items-center justify-center text-center">
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
            <div className="flex h-fit ml-4 text-md card-sm:text-lg font-bold items-center justify-center text-center">
              Release Date
            </div>
          </label>
        </div> */}

        {/* //contains filters/buttons/search field/etc. */}

        <SearchFormForReply
          onFormChange={filterAndSetCharacters}
          selectedCategories={selectedCategories}
          handleNewCategorySelected={handleNewCategorySelected}
          handleSelectedCategoryRemoval={handleSelectedCategoryRemoval}
        />

        {/* //character select box */}
        <div
        id='characterSelectContainerRef' 
        ref={characterSelectContainerRef}
        className="flex flex-wrap h-[25vh] justify-around items-center p-1 mx-1 lg:mx-2 mt-2 lg:mt-3 lg:mb-4 border-2 border-slate-900 overflow-y-auto bg-orange-100">
           
          {charactersToDisplay
              .filter((character) => character.glb_date !== null)
              .slice(0, viewableCharacters)
              .map((character) => (
                <div 
                onClick={() => handleCommentCharacterSelection(character.id)}
                className={`px-[.5%] ${characterSelection.includes(character.id) ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-600'}`}
                key={'div'+character.id}
                >
                  <CharacterCard key={character.id} individualCharacter={character}/>
                </div>
              ))
          }
        </div>
      </div>
  )
}

const CharacterCard = ({individualCharacter}) => {
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
            className="h-[60px] card-sm:h-[75px] w-[60px] card-sm:w-[75px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
            cldImg={characterThumb}
            alt={individualCharacter.name}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          <AdvancedImage
            cldImg={characterRarity}
            className={individualCharacter.rarity === "UR"
                ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
            }
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
            cldImg={characterTypeBackground}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
          <AdvancedImage
            className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
            cldImg={characterTypeBadge}
            // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
          />
        </div>
    </>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = (allCharacters, filterData, selectedCategories) => {
  const baseChars = allCharacters;
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

export default CharacterSelectionForReply