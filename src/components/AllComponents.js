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

function AllComponents() {
  // Queries for all characters to get an array of objects
  const { loading: allCharactersLoading, data: allCharactersData } = useQuery(QUERY_CHARACTERS, {
    onCompleted: (data) => {
      console.log(data)
    }
  });
  const allCharacters = allCharactersData?.characters || [];

  const characterDictionary = Object.fromEntries(
    allCharacters.map((characterObj) => [characterObj.id, characterObj])
  );

  const [filteredCharacters, setFilteredCharacters] = useState(null);

  const [cardDetails, setCardDetails] = useState({
    "id": 1331,
    "char_link": "https://dbz-dokkanbattle.fandom.com/wiki/Heartless_Destruction_Buu_(Kid)",
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
    "sa_description": "Causes supreme damage and lowers DEF  <Lowers enemy's DEF by 40% for 3 turns>  ",
    "sa_description_eza": "Causes immense damage to enemy and lowers DEF  <Lowers enemy's DEF by 40% for 3 turns>  ",
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

  // TODO: is it safe to call the token outside the query?
  // can initial query to find savedCharacters (array of IDs from user) the onComplete allows the saved characters to be set to the deck (important for adding and removing characters)
  const token = Auth.getToken()
  const { loading: isUserDataLoading, data: userData } = useQuery(GET_USERDATA,
    {
      variables: {token: token},
      onCompleted: (data) => {
        setSavedToDeck(data.findOneUser.savedCharacters)
      },
    }
  );
  const userCharacterIds = userData?.findOneUser?.savedCharacters || [];
  
  // lazyQuery which is called in a useEffect to find the character objects from their IDs (results in an array of the characters saved to the user) this is used for finding characters in My Deck
  const [getUserCharactersById, { loading: isUserCharactersLoading, data: userCharacterData }] = useLazyQuery(GET_USERCHARACTERSBYID, {
    variables: {
      dokkanIds: userCharacterIds,
    },
    skip: userCharacterIds.length === 0
  });
  const userCharacters = userCharacterData?.charactersWithIds || [];

  // this allows the lazyQuery to load on page load, putting characters into the My Deck filter
  useEffect(() => {
    getUserCharactersById();
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
  
  const [updateSavedCharacters,{ error: updateSavedCharactersError, data: newSavedCharacters }] = useMutation(UPDATE_SAVED_CHARACTERS);
  //this runs on the save button click
  async function handleUpdateSavedCharacters() {
    const token = Auth.getToken();
    await updateSavedCharacters({
      variables: {
        token: token,
        newSavedCharacters: savedToDeck,
      },
    });
    // closes out card selection for deck building
    setMultiCardSelection(false)
    //TODO: pretty sure this is unecessary // the savedToDeck is updated to the most recent array of ids
    // setSavedToDeck(savedToDeck);
    // After mutation is completed, re-run the lazy query to get the updated userCharacters
    await getUserCharactersById({ variables: { dokkanIds: savedToDeck } });
  }
  

  function newCardDetails(characterId) {
    setCardDetails(characterDictionary[characterId]);
  }

  const filterAndSetCharacters = (filterData) => setFilteredCharacters(getFilteredCharacters(allCharacters, userCharacters, filterData));

  //added the slice to orient characters by id
  const charactersToDisplay = filteredCharacters === null ? allCharacters.slice().sort((a, b) => b.id - a.id) : filteredCharacters.slice().sort((a, b) => b.id - a.id);

  //scroll ability through buttons on mobile
  const scrollToSingleCardStats = () => {
    const middleColumn = document.getElementById("SingleCardDetails");
    middleColumn.scrollIntoView({top: 0, left: 0});
  };
  const scrollToCharacterSelection = () => {
    window.scrollTo({top: 0, left: 0});
  };
  const scrollToTeam = () => {
    const middleColumn = document.getElementById("Team");
    middleColumn.scrollIntoView({top: 0, left: 0});
  };

  return (
    // stages formatting
    <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-3 bg-slate-700">
      {/* //left column styling */}
      <div className="lg:hidden h-[4vh] px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
        <button 
        className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-l-lg"
        onClick={() => scrollToSingleCardStats()}>Character Details</button>
        <button 
        className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-r-lg"
        onClick={() => scrollToTeam()}>Team</button>
      </div>
      <div className="h-[86vh] lg:h-[90vh] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900">
        <h1 className="font-header text-2xl text-center m-2 lg:m-4">Search by Filters</h1>

        {/* //contains filters/buttons/search field/etc. */}

        <SearchForm onFormChange={filterAndSetCharacters} isDisabled={allCharactersLoading}/>

        <div className="flex w-full items-center justify-center">
          {Auth.loggedIn() ? 
          (
          <>
          <h2 className="p-3 text-center font-bold">Character Selection</h2>
            <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={multiCardSelection}
                  readOnly
                />
                <div
                  onClick={() => {setMultiCardSelection(!multiCardSelection)}}
                  className="w-11 h-6 bg-orange-100 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"
                ></div>
                <span className="ml-2 text-sm font-bold text-gray-900">
                  ON
                </span>
              </label>
            </div>
            <div class="flex space-x-2 justify-center">
              <button
                disabled={!multiCardSelection || allCharactersLoading}
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className='disabled:bg-gray-500 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                onClick={() => handleUpdateSavedCharacters()}
              >Save</button>
            </div>
          </>
          ) : (
            <h2 className="p-2 font-bold">Please log in to add players</h2>
          )
          }
        </div>

        {/* //character select box */}
        <div className="h-fit p-1 m-1 mb-4 card-sm:m-1 border-2 border-slate-900 overflow-y-auto bg-orange-100 lg:m-2">
          {allCharactersLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-wrap justify-center items-center h-full max-h-[60vh]">
              {charactersToDisplay &&
                charactersToDisplay.map((character) => (
                <div 
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
                ))}
            </div>
          )}
        </div>
      </div>
      {/* //middle column styling */}
      <div
        id="SingleCardDetails"
        className="h-[100vh] lg:h-[90vh] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900"
      >
        <div className="lg:hidden h-[4vh] px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
          <button 
            className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-l-lg"
            onClick={() => scrollToCharacterSelection()}>
              Selection
          </button>
          <button 
            className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-r-lg"
            onClick={() => scrollToTeam()}>
              Team
          </button>
        </div>
        <CardDetails
          cardDetails={cardDetails}
          userCharacterIds={userCharacterIds}
        />
        {/* <Links links={links}/> */}
      </div>

      {/* //right column styling */}
      <div
        id="Team"
        className="h-[100vh] lg:h-[90vh] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-slate-900"
      >
        <div className="lg:hidden h-[4vh] px-2 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex justify-around border-slate-900">
          <button 
            className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-l-lg"
            onClick={() => scrollToCharacterSelection()}>
              Selection
          </button>
          <button 
            className="font-header text-2xl w-1/2 bg-orange-200 border-2 border-slate-900 rounded-r-lg"
            onClick={() => scrollToSingleCardStats()}>
              Details
          </button>
        </div>
        <SuggestToWeb
          selectedCharacter={cardDetails}
          handleNewDetails={newCardDetails}
          addToWebOfTeam={ addToWebOfTeam}
          webOfTeam={webOfTeam}
          removeFromWebOfTeam={removeFromWebOfTeam}
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
      (!filterData.characterRarity || filterData.characterRarity === character.rarity)
    );
  });
};

export default AllComponents;


