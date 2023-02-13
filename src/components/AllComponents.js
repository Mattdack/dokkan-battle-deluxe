import React, { useState, useEffect } from "react";
import AllComponentsCard from "./AllComponentsCard";
import SearchForm from "./SearchForm";
import SuggestToWeb from "./SuggestToWeb";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CHARACTERS, GET_USERDATA, GET_USERCHARACTERSBYID } from "../util/queries";

import { useMutation } from "@apollo/client";
import { UPDATE_SAVED_CHARACTERS } from "../util/mutations"
import CardDetails from "./CardDetails";
import Auth from "../util/auth";

import * as sort from "../util/sorting"

function AllComponents() {
  // Queries for all characters to get an array of objects
  const { loading: allCharactersLoading, data: allCharactersData } = useQuery(QUERY_CHARACTERS);
  const allCharacters = allCharactersData?.characters || [];

  const characterDictionary = Object.fromEntries(
    allCharacters.map((characterObj) => [characterObj.id, characterObj])
  );

  const [filteredCharacters, setFilteredCharacters] = useState(null);

  const [cardDetails, setCardDetails] = useState({
    "id": 1331,
    "thumb": 1003310,
    "art": null,
    "title": "Heartless Destruction",
    "name": "Buu (Kid)",
    "rarity": "UR",
    "type": "EPHY",
    "cost": "42",
    "ls_description": "Allies’ ATK increases (MAX +50%) based on HP left",
    "ls_description_eza": "All Types Ki +3 and HP & DEF +50%, raises ATK by up to 80% (the more HP remaining, the greater the ATK boost)",
    "sa_type": "Ki ",
    "sa_name": "Planet Burst",
    "sa_description": "Causes supreme damage and lowers DEF <Lowers enemy's DEF by 40% for 3 turns>  ",
    "sa_description_eza": "Causes immense damage to enemy and lowers DEF<Lowers enemy's DEF by 40% for 3 turns>  ",
    "ultra_sa_type": null,
    "ultra_sa_name": null,
    "ultra_sa_description": null,
    "ultra_sa_description_eza": null,
    "ps_name": "Planetary Destruction",
    "ps_description": "ATK & DEF +50% for all allies when HP is 80% or above",
    "ps_description_eza": "All allies' Ki +2 and ATK & DEF +50% when HP is 80% or above; all allies' ATK & DEF +30% when HP is 79% or below",
    "sa_type_active": null,
    "active_skill_name": null,
    "active_skill": null,
    "active_skill_condition": null,
    "active_skill_condition_eza": null,
    "transform_type": null,
    "transform_condition": null,
    "transform_condition_eza": null,
    "link_skill": [
      "Majin",
      "Brutal Beatdown",
      "More Than Meets the Eye",
      "Big Bad Bosses",
      "Infinite Regeneration",
      "Fierce Battle",
      "The Wall Standing Tall"
    ],
    "category": [
      "Resurrected Warriors",
      "Majin Buu Saga",
      "Transformation Boost",
      "Artificial Life Forms",
      "Majin Power",
      "Planetary Destruction",
      "Storied Figures",
      "Legendary Existence",
      "Sworn Enemies",
      "Accelerated Battle",
      "Worldwide Chaos",
      "Battle of Fate"
    ],
    "jp_date": "1 Dec 2015",
    "glb_date": "6 Apr 2016",
    "jp_date_eza": "11 Oct 2018",
    "glb_date_eza": "22 Jan 2019"
  });

  //setting a state of webOfTeam for characeters in graph
  const [webOfTeam, setWebOfTeam] = useState([]);

  // These are both needed to edit the teams, this logic is what is also passed to SuggestToWeb for editing the Web there too
  function  addToWebOfTeam(character) {
    setWebOfTeam((prev) => {
      if(prev.includes(character)) {
        return prev;
      } else {
        return [...prev, character];
      }
    });
  }
  function removeFromWebOfTeam(character) {
    setWebOfTeam(prev => prev.filter(c => c.id !== character.id));
  }

  // can initial query to find savedCharacters (array of IDs from user) the onComplete allows the saved characters to be set to the deck (important for adding and removing characters)
  const profileData = Auth.getProfile() || []
  const { loading: isUserDataLoading, data: userData } = useQuery(GET_USERDATA,
    {
      variables: {
        profileId: profileData?.data?._id || '',
      },
      onCompleted: (data) => {
        setSavedToDeck(data.findOneUser.savedCharacters)
      },
    }
  );
  const userCharacterIds = userData?.findOneUser?.savedCharacters || [];
  
  // lazyQuery which is called in a useEffect to find the character objects from their IDs (results in an array of the character objects saved to the user) this is used for finding characters in My Deck
  const [getUserCharacterObjects, { loading: isUserCharactersLoading, data: userCharacterData }] = useLazyQuery(GET_USERCHARACTERSBYID, {
    variables: {
      dokkanIds: userCharacterIds,
    },
    skip: userCharacterIds.length === 0
  });
  const userCharacters = userCharacterData?.charactersWithIds || [];

  // this allows the lazyQuery to load on page load, putting characters into the My Deck filter
  useEffect(() => {
    getUserCharacterObjects();
  }, []);
  

  // this useEffect renders selected card based on which cards are in the persons deck already
  useEffect(() => {
    if (userCharacters) {
      setSavedToDeck(userCharacters.map((c) => c.id));
    }
  }, []);

  //adding state for saved to deck...initially composed of userCharacterIds
  const [savedToDeck, setSavedToDeck] = useState(userCharacterIds)
  //adds or remove characters from the state deck 
  function changeDeck(characterId) {
    setSavedToDeck((prev) => {
      if(prev.includes(characterId)) {
        return prev.filter(id => id !== characterId);
      } else {
        return [...prev, characterId];
      }
    });
  }
  
  const [multiCardSelection, setMultiCardSelection] = useState(false);
  
  const [updateSavedCharacters,{ error: updateSavedCharactersError, data: updatedSavedCharacters }] = useMutation(UPDATE_SAVED_CHARACTERS);
  //this runs on the save button click
  async function handleUpdateSavedCharacters() {
    const profileData = Auth.getProfile()
    await updateSavedCharacters({
      variables: {
        profileId: profileData.data._id,
        newSavedCharacters: savedToDeck,
      },
    });
    // closes out card selection for deck building
    setMultiCardSelection(false)
    //TODO: pretty sure this is unecessary // the savedToDeck is updated to the most recent array of ids
    // setSavedToDeck(savedToDeck);
    // After mutation is completed, re-run the lazy query to get the updated userCharacters
    await getUserCharacterObjects({ variables: { dokkanIds: savedToDeck } });
  }
  

  function newCardDetails(characterId) {
    setCardDetails(characterDictionary[characterId]);
  }

  const filterAndSetCharacters = (filterData) => setFilteredCharacters(getFilteredCharacters(allCharacters, userCharacters, filterData));

  //TODO: can be optimized/look cleaner if this sort/filter was a util function
  //this seems complex but isn't when broken down. First, it starts with charactersToDisplay and sets it equal to filteredCharacters. However, if filteredCharacters (anything in the form is filled out) is null then look for the state of the filter and filter based on that
  const [filterByGame, setFilterByGame] = useState(true);
  const charactersToDisplay = filteredCharacters === null ? (
    (filterByGame ? 
      allCharacters.slice().sort((a, b) => {
        const typeOrder = ['EAGL', 'SAGL', 'ETEQ', 'STEQ', 'EINT', 'SINT', 'ESTR', 'SSTR', 'EPHY', 'SPHY'];
        const rarityOrder = ['UR', 'LR'];
      
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
      :        
      allCharacters.slice().sort((a, b) => {
        if (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime() === 0) {
          return b.id - a.id;
        }
        return new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime();
      })       
    ) 
  ) 
    // This is now starting the FILTERED characters (if filter form is filled out)
    :
  (
    (filterByGame ? 
      filteredCharacters.slice().sort((a, b) => {
        const typeOrder = ['EAGL', 'SAGL', 'ETEQ', 'STEQ', 'EINT', 'SINT', 'ESTR', 'SSTR', 'EPHY', 'SPHY'];
        const rarityOrder = ['UR', 'LR'];
      
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
      :
      filteredCharacters.slice().sort((a, b) => {
        if (new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime() === 0) {
          return b.id - a.id;
        }
        return new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime();
      })
    )
  )
  

  const [viewableCharacters, setViewableCharacters] = useState(50);

  //scroll ability through buttons on mobile
  const scrollToSingleCardStats = () => {
    const middleColumn = document.getElementById("SingleCardDetails");
    middleColumn.scrollIntoView({top: 0, left: 0});
  };
  const scrollToCharacterSelection = () => {
    const middleColumn = document.getElementById("CardSelection");
    middleColumn.scrollIntoView({top: 0, left: 0});
  };
  const scrollToTeam = () => {
    const middleColumn = document.getElementById("Team");
    middleColumn.scrollIntoView({top: 0, left: 0});
  };

  return (
    // stages formatting
    <div className="disable-zoom overflow-hidden flex flex-row lg:flex-wrap bg-slate-700">
      {/* //left column styling */}
      <div 
      id='CardSelection'
      className="h-[100vh] lg:h-[90vh] w-screen lg:w-1/3 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900">
        <div className="lg:hidden h-[5vh] w-screen lg:w-1/3 px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
          <button 
          className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-l-lg"
          onClick={() => scrollToSingleCardStats()}>Details</button>
          <button 
          className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-r-lg"
          onClick={() => scrollToTeam()}>Team</button>
        </div>

        {/* <h1 className="font-header text-2xl text-center lg:m-4">Search by Filters</h1> */}

        <div className="flex pt-4 pb-2 items-center justify-center">
            <span className="mr-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-bold">
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
            <div className="ml-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-bold">
              Release Date
            </div>
          </label>
        </div>

        {/* //contains filters/buttons/search field/etc. */}

        <SearchForm onFormChange={filterAndSetCharacters} isDisabled={allCharactersLoading}/>

        <div className="flex w-full items-center justify-center">
          {Auth.loggedIn() ? 
          (
          <>
          <h2 className="pr-3 card-sm:p-3 text-sm card-sm:text-base text-center font-bold">Character Selection</h2>
            <div className="flex items-center ">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={multiCardSelection}
                  readOnly
                />
                <div
                  onClick={() => {setMultiCardSelection(!multiCardSelection)}}
                  className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[21%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                ></div>
                <span className="ml-2 text-sm card-sm:text-base font-bold text-gray-900">
                  ON
                </span>
              </label>
            </div>
            <div className="flex space-x-2 justify-center">
              <button
                disabled={!multiCardSelection || allCharactersLoading}
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className='disabled:bg-gray-500 inline-block px-4 card-sm:px-6 py-1.5 card-sm:py-2.5 bg-blue-600 text-white font-medium text-sm card-sm:text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                onClick={() => handleUpdateSavedCharacters()}
              >Save</button>
            </div>
          </>
          ) : (
            <h2 className="p-2 text-md lg:text-base font-bold">Please log in to add players</h2>
          )
          }
        </div>

        {/* //character select box */}
        <div className="disable-zoom flex flex-wrap justify-center items-center p-1 mx-1 mb-16 card-sm:mb-16 lg:mx-2 lg:mt-3 lg:mb-6 border-2 border-slate-900 overflow-y-auto bg-orange-100">
        {allCharactersLoading ? (
            <div>Loading...</div>
          ) : (
            window.innerWidth < 550 ?
              charactersToDisplay.slice(0, viewableCharacters) :
              charactersToDisplay
            )
            .filter(character => character.glb_date !== null).map((character) => (

              <div 
                id='CharacterCard'
                key={character.id}
                onClick={() => {multiCardSelection ? changeDeck(character.id) : newCardDetails(character.id)}}
                onDoubleClick={() => {
                      if (!multiCardSelection) {
                          if (webOfTeam.map(char => char.id).includes(character.id)) {
                              setWebOfTeam(webOfTeam.filter(char => char.id !== character.id));
                          } else {
                              setWebOfTeam([...webOfTeam, character]);
                          }
                        }
                      }}>
                  <AllComponentsCard 
                    character={character} 
                    savedToDeck={multiCardSelection ? savedToDeck : undefined} 
                    webOfTeam={!multiCardSelection ? webOfTeam : undefined}
                  />
              </div>
            ))
        }
        {charactersToDisplay.length > viewableCharacters && (
          
            <button className="w-full py-2 mx-10 my-4 text-center font-bold border-2 border-black bg-orange-300 hover:bg-orange-400" onClick={() => setViewableCharacters(viewableCharacters + 75)}>
              Load More Characters
            </button>
          
        )}
        </div>
      </div>
      {/* //middle column styling */}
      <div
        id="SingleCardDetails"
        className="h-[100vh] lg:h-[90vh] w-screen lg:w-1/3 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900"
      >
        <div className="lg:hidden h-[5vh] w-screen lg:w-1/3 px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
          <button 
            className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-l-lg"
            onClick={() => scrollToCharacterSelection()}>
              Selection
          </button>
          <button 
            className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-r-lg"
            onClick={() => scrollToTeam()}>
              Team
          </button>
        </div>
        <CardDetails
          cardDetails={cardDetails}
          userCharacterIds={userCharacterIds}
        />
      </div>

      {/* //right column styling */}
      <div
        id="Team"
        className="h-[100vh] lg:h-[90vh] w-screen lg:w-1/3 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900"
      >
        <div className="lg:hidden h-[5vh] w-screen lg:w-1/3 px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
          <button 
            className="font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-l-lg"
            onClick={() => scrollToCharacterSelection()}>
              Selection
          </button>
          <button 
            className="flex font-header text-lg card-sm:text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-r-lg"
            onClick={() => scrollToSingleCardStats()}>
              Details
          </button>
        </div>
        <SuggestToWeb
          selectedCharacter={cardDetails}
          userCharacters={userCharacters}
          handleNewDetails={newCardDetails}
          addToWebOfTeam={addToWebOfTeam}
          webOfTeam={webOfTeam}
          removeFromWebOfTeam={removeFromWebOfTeam}
          allCharactersLoading={allCharactersLoading}
        />
      </div>
    </div>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters
// based on the criteria in filterData
const getFilteredCharacters = (allCharacters, userCharacters, filterData) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters;
  return baseChars.filter((character) => {
    return (
      (!filterData.searchTerm || character.name.toLowerCase().includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterCategory || character.category.includes(filterData.characterCategory)) &&
      (!filterData.characterType || character.type.includes(filterData.characterType)) &&
      (!filterData.characterSuperOrExtreme || character.type.slice(0,1).includes(filterData.characterSuperOrExtreme)) &&
      (!filterData.characterRarity || filterData.characterRarity === character.rarity)
    );
  });
};

export default AllComponents;


